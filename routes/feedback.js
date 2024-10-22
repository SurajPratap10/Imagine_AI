const express = require("express");
const { feedbackController } = require("../controllers/feedbackController");
const { feedbackValidation, validate } = require("../middlewares/feedbackValidator");

const router = express.Router();

router.post("/", feedbackValidation, validate, feedbackController);

module.exports = router;
