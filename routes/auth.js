const express = require("express");
const {
  signupController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

module.exports = router;
