const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const userModel = require("../models/users");

exports.sendToken = async (user, res) => {
  const token = user.getSignedToken(res);
  res.status(201).json({ user, token });
};
exports.signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = await userModel.find({ email });

    if (emailExists.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      const user = await userModel.create({ name, email, password });
      this.sendToken(user, res);
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ error: "Something went wrong! Try again." });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user_list = await userModel.find({ email });

    if (user_list.length === 0) {
      return res.status(400).json({ error: "No such Email Exists!" });
    } else {
      const user = user_list[0];
      const matched = await user.matchPassword(password);

      if (!matched) {
        return res.status(400).json({ error: "Invalid Password" });
      } else {
        this.sendToken(user, res);
      }
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ error: "Something went wrong! Try again." });
  }
};
