const express = require("express");

const { subscribeToEmail } = require("../controllers/subscribeController");

const router = express.Router();

router.post("/", subscribeToEmail);

module.exports = router;
