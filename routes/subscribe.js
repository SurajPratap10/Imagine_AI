const express = require('express');

const { subscribeToEmail } = require('../controllers/subscribeController');
const { emailValidation, validate } = require('../middlewares/emailValidator');

const router = express.Router();

router.post("/", emailValidation, validate, subscribeToEmail);

module.exports = router;

