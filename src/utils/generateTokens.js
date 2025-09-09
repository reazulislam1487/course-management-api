const jwt = require("jsonwebtoken");

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  });
}

module.exports = { generateAccessToken, generateRefreshToken };
