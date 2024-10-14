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
module.exports = router;
