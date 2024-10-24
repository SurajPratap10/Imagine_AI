const express = require("express");
const {
  signupController,
  loginController,
} = require("../controllers/authController");
const {
  validate,
  signupValidation,
  loginValidation,
} = require("../middlewares/authValidator");
const router = express.Router();

router.post("/signup", signupValidation, validate, signupController);
router.post("/login", loginValidation, validate, loginController);

module.exports = router;
