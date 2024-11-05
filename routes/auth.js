const express = require("express");
const passport = require("passport");
const {
  signupController,
  loginController,
} = require("../controllers/authController");
const {
  successRegister: googleSuccessRegister,
  authRegister: googleAuthRegister,
} = require("../controllers/googleAuthController");
const {
  successRegister: facebookSuccessRegister,
  authRegister: facebookAuthRegister,
} = require("../controllers/facebookAuthController");
const {
  successRegister: twitterSuccessRegister,
  authRegister: twitterAuthRegister,
} = require("../controllers/twitterAuthController");

const router = express.Router();

// Signup and login routes
router.post("/signup", signupController);
router.post("/login", loginController);

// Google OAuth routes
router.get("/auth/google", googleAuthRegister);
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/signup" }), googleSuccessRegister);

// Facebook OAuth routes
router.get("/auth/facebook", facebookAuthRegister);
router.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/signup" }), facebookSuccessRegister);

// Twitter (X) OAuth routes
router.get("/auth/twitter", twitterAuthRegister);
router.get("/auth/twitter/callback", passport.authenticate("twitter", { failureRedirect: "/signup" }), twitterSuccessRegister);

module.exports = router;
