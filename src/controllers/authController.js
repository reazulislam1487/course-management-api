const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, name } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: 'Email already registered' });

  const hashed = await bcrypt.hash(password, saltRounds);
  const user = new User({ email, password: hashed, name });
  await user.save();

  res.status(201).json({ msg: 'User created' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ msg: 'Invalid credentials' });

  const payload = { id: user._id.toString(), role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
  await user.save();

  res.json({ accessToken, refreshToken });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ msg: 'No refresh token provided' });

  // Verify refresh token
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: 'User not found' });

    const found = user.refreshTokens.find(rt => rt.token === refreshToken);
    if (!found) return res.status(401).json({ msg: 'Refresh token invalid' });

    const payload = { id: user._id.toString(), role: user.role };
    const newAccess = generateAccessToken(payload);
    const newRefresh = generateRefreshToken(payload);

    // replace old refresh token with new
    user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refreshToken);
    user.refreshTokens.push({ token: newRefresh, createdAt: new Date() });
    await user.save();

    return res.json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid refresh token' });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ msg: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refreshToken);
    await user.save();

    res.json({ msg: 'Logged out' });
  } catch (err) {
    res.status(400).json({ msg: 'Invalid refresh token' });
  }
};
