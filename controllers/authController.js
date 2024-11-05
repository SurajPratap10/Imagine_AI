const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const userModel = require("../models/users");

exports.sendToken = async (user, res) => {
  try {
    const token = user.getSignedToken(); // Ensure getSignedToken is defined in user model
    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Token generation error:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
};

exports.signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Name validation
    if (name.length < 5) {
      return res.status(400).json({ error: "Name should be at least 5 characters long." });
    }

    // Email validation
    if (!emailValidator.validate(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    // Password validation: Min 8 characters, at least one uppercase, one lowercase, one digit
    const passwordSchema = new passwordValidator()
      .is().min(8)
      .is().max(100)
      .has().uppercase()
      .has().lowercase()
      .has().digits(1);

    if (!passwordSchema.validate(password)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
      });
    }

    // Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Create new user and send token
    const user = await userModel.create({ name, email, password });
    return this.sendToken(user, res);

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "An error occurred. Please try again." });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email format
    if (!emailValidator.validate(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    // Check if email exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No user found with this email." });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password." });
    }

    // Send token if login is successful
    return this.sendToken(user, res);

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "An error occurred. Please try again." });
  }
};
