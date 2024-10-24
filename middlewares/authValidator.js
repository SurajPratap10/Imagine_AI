const { check, validationResult } = require("express-validator");

// Signup validation rules
exports.signupValidation = [
  check("name")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters long"),
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit"),
];

// Login validation rules
exports.loginValidation = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password").exists().withMessage("Password is required"),
];

// Middleware to check for validation errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
