const nodemailer = require("nodemailer");

// Please do add your host, port and auth user and pass here.
// The below are just for testing.
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "141609d4f18d08",
    pass: "391a02d8f4e532",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail Server is running...");
  }
});

module.exports = transporter;
