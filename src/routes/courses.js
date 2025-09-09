const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { courseCreateValidation } = require("../middleware/validateRequest");

// Public
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);

// Admin only
router.post(
  "/",
  auth,
  role("admin"),
  courseCreateValidation,
  courseController.createCourse
);
router.delete("/:id", auth, role("admin"), courseController.deleteCourse);

module.exports = router;
