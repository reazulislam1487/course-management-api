const { validationResult } = require('express-validator');
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description, price, instructor } = req.body;
  const course = new Course({ title, description, price, instructor });
  await course.save();
  res.status(201).json(course);
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  const removed = await Course.findByIdAndDelete(id);
  if (!removed) return res.status(404).json({ msg: 'Course not found' });
  res.json({ msg: 'Course deleted' });
};

exports.getAllCourses = async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json(courses);
};

exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ msg: 'Course not found' });
  res.json(course);
};
