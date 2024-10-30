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
    res.status(200).send("Feedback sent successfully");
  } catch (error) {
    res.status(500).send("Error sending feedback");
    console.log(error.message);
  }
};
