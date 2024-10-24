
const express = require("express");
const { contactusController } = require("../controllers/contactusController");


const router = express.Router();

router.post('/', contactusController);

module.exports = router;
