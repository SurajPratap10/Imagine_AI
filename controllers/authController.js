const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");

exports.sendToken = async (user, res) => {
  const token = user.getSignedToken(res);
  res.status(201).json({ user, token });
};
exports.signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name.length < 5) {
      res
        .status(400)
        .json({ error: "invalid name!!!! Name should be atleast 5 char long" });
      return;
    }

    if (!emailValidator.validate(email)) {
      res.status(400).json({ error: "invalid email!!!!" });
      return;
    }
    // validate password as--> Min 8 char, one upper case,one lowercase,one digit

    const passwordSchema = new passwordValidator();
    passwordSchema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits(1); // Must have at least 1 digits

    if (!passwordSchema.validate(password)) {
      res.status(400).json({
        error:
          "Password Should be of atleast 8 char long and should contain 1 upper case, 1 lower case and 1 digit",
      });
      return;
    }

    const emailExists = await userModel.findOne({ email });

    if (emailExists.length > 0) {
      console.log(emailExists);
      //email already exists
      res.status(409).json({ error: "Email already exists" });
    } else {
      const user = await userModel.create({ name, email, password });
      this.sendToken(user, res);
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(404).json({ error: "Something Went Wrong!!! Try Again" });
  }
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!emailValidator.validate(email)) {
    res.status(400).json({ error: "invalid email!!!!" });
    return;
  }
  const user_list = await userModel.findOne({ email });

  if (user_list.length === 0) {
    res.status(400).json({ error: "No such Email Exists!!!!" });
    return;
  } else {
    //email is in our DB..let's check for matching password
    const user = user_list[0];
    const matched = await user.matchPassword(password);

    if (!matched) {
      //invalid-password
      res.status(400).json({ error: "Invalid Password" });
      return;
    } else {
      //if matched..get the tokens
      this.sendToken(user, res);
    }
  }
};
exports.forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!emailValidator.validate(email)) {
    return res.status(400).json({ error: "Invalid email!!!!" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_RESET_PASSWORD_SECRET, { expiresIn: "1h" });

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    sendPasswordResetEmail(user.email, resetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ error: "Something went wrong!!! Try again" });
  }
};

exports.resetPasswordController = async (req, res) => {
  const { email, token, newPassword } = req.body;

  if (!emailValidator.validate(email)) {
    return res.status(400).json({ error: "Invalid email!!!!" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.resetPasswordToken !== token || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ error: "Something went wrong!!! Try again" });
  }
};

const nodemailer = require("nodemailer");

const sendPasswordResetEmail = (email, resetToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email provider details (e.g., SMTP settings)
    // Refer to the Nodemailer documentation for your specific email provider configuration
    // For example, for Gmail:
    service: "Gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  // Define the email options
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `You have requested a password reset. Please click the following link to reset your password: ${resetToken}`,
  };

  // Send the email using the defined transporter and mail options
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      // Handle the error accordingly
    } else {
      console.log("Email sent:", info.response);
      // Handle the success accordingly
    }
  });
};
