const nodemailer = require("nodemailer");
require("dotenv").config();

exports.contactUs = (req, res) => {
  const { firstName, lastName, email, phone, feedback } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Disable strict SSL verification
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `${firstName} ${lastName}`,
      text: feedback,
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, mailOptions) => {
      if (error) {
        return console.log("Error occurred: " + error.message);
      }
    });

    res.status(200).json({
      status: "success",
      message: "Your contact request has been successfully received.",
    });
  } catch (err) {
    console.log(`Error at transport: ${err}`);
    res.status(500).json({
      status: "error",
      message:
        "There was an error sending your message. Please try again later.",
    });
  }

  res.status(200).json({ message: "Thank you for contacting us!" });
};
