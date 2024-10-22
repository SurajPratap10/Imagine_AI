const { check, validationResult } = require("express-validator");


exports.emailValidation = [
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .matches(/^[^\s@]+@gmail\.com$/i)
    .withMessage("Only Gmail addresses are allowed."),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
