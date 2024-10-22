const nodemailer = require("nodemailer");


exports.feedbackController = async (req, res) => {
  const { name, email, feedback } = req.body;


  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: email,
    to: "swetabh333@gmail.com",
    subject: `Feedback from ${name}`,
    text: feedback,
  };

  try {

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Feedback sent successfully" });
  } catch (error) {
    console.error("Error sending feedback:", {
      message: error.message,
      stack: error.stack,
      additionalInfo: {
        user: email,
        feedback: feedback,
      },
    });

    res.status(500).json({ error: "Error sending feedback. Please try again later." });
  }
};
