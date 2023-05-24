const express = require("express");
const { generateImage,generateImages } = require("../controllers/openaiController");
const router = express.Router();

// generate only one images
router.post("/generateimage", generateImage);
// generate N number of images
router.post("/generateimages/:numImages", generateImages);

module.exports = router;
