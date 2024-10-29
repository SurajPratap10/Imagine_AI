const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.render("intro", { path: "/" }); // Fixed syntax error
});

// Serve the home page after intro
router.get("/home", (_req, res, _next) => {
  res.render("home", { path: "/home" });
});

router.get("/generateImg", (_req, res, _next) => {
  res.render("imagineAi", { path: "/generateImg" });
});

router.get("/contactUs", (_req, res, _next) => {
  res.render("contactUs", { path: "/contactUs" });
});

router.get("/team", (_req, res, _next) => {
  res.render("team", { path: "/team" });
});

router.get("/aboutUs", (_req, res, _next) => {
  res.render("aboutUs", { path: "/aboutUs" });
});

router.get("/login", (req, res, next) => {
  res.render("login", { path: "/login" });
});

router.get("/signup", (_req, res, _next) => {
  res.render("signup", { path: "/signup" });
});

router.get("/slider", (_req, res, _next) => {
  res.render("slider", { path: "/slider" });
});

router.get("/privacypolicy", (req, res, next) => {
  res.render("privacypolicy", { path: "privacypolicy" });
});

// Render forgot password page
router.get("/forgot-password", (req, res) => {
  res.render("forgot-password", { path: "/forgot-password" });
});

// Handle forgot password form submission
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  // Implement password recovery logic here (e.g., send recovery email)
  res.redirect("/login");
});

router.get("/feedback", (_req, res, next) => {
  res.render("feedback", { path: "/feedback" });
});

module.exports = router;
