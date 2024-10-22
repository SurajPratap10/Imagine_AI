const { check, validationResult } = require("express-validator");

exports.feedbackValidation = [
  check("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("feedback").isLength({ min: 10 }).withMessage("Feedback must be at least 10 characters long"),
];


exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
