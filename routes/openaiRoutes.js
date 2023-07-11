const express = require("express");
const {
  generateImage,
  generateImages,
} = require("../controllers/openaiController");
const {
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/authController");
const router = express.Router();

// generate only one images
router.post("/generateimage", generateImage);
// generate N number of images
router.post("/generateimages", generateImages);
// Forgot password routes
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

module.exports = router;
