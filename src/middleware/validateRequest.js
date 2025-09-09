const { body } = require("express-validator");

exports.registerValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars"),
  body("name").optional().isString(),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").exists().withMessage("Password required"),
];

exports.courseCreateValidation = [
  body("title").notEmpty().withMessage("Title required"),
  body("description").notEmpty().withMessage("Description required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("instructor").notEmpty().withMessage("Instructor required"),
];

exports.purchaseValidation = [
  body("courseId")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid courseId required"),
];
