// routes/feedback.js
const nodemailer = require("nodemailer");
const contactUs = require("../models/contactUs");

exports.contactusController = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, feedback } = req.body;

  try {
    // Save the feedback to the database
    const newFeedback = new contactUs({
      firstName,
      lastName,
      email,
      phoneNumber,
      feedback,
    });

    await newFeedback.save();

    // Send a thank-you email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your feedback!",
      text: `Dear ${firstName},
  
  Thank you for your valuable feedback!
  
  Here is a copy of what you submitted:
  ----------------------------------------
  Feedback: ${feedback}
  
  Best regards,
  Imagine AI
  `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Feedback submitted successfully and mail sent to the mail id",
      newFeedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the feedback" });
  }
};
