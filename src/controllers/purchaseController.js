const { validationResult } = require('express-validator');
const Purchase = require('../models/Purchase');
const Course = require('../models/Course');

exports.purchaseCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const userId = req.user.id;
  const { courseId } = req.body;
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ msg: 'Course not found' });

  // In real app: integrate payment gateway. For this task we just record purchase.
  const purchase = new Purchase({ userId, courseId, amount: course.price });
  await purchase.save();

  res.status(201).json({ msg: 'Course purchased', purchase });
};

exports.getMyPurchases = async (req, res) => {
  const userId = req.user.id;
  const purchases = await Purchase.find({ userId }).populate('courseId');
  res.json(purchases);
};
