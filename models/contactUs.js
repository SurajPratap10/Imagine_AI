// models/Feedback.js
const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[+]*[0-9]{10,15}$/,
  },
  feedback: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
  },
});

module.exports = mongoose.model("ContactUs", contactUsSchema);
