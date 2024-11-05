const passport = require("passport");
const User = require("../models/users");

exports.twitterAuthRegister = async (profile) => {
  try {
    const existingUser = await User.findOne({ twitterId: profile.id });

    if (existingUser) {
      return true;
    } else {
      const newUser = new User({
        name: profile.displayName,
        username: profile.username,
        twitterId: profile.id,
      });
      await newUser.save();
      return true;
    }
  } catch (error) {
    console.error("Error during Twitter registration:", error);
    return false;
  }
};

exports.twitterAuthLogin = async (id) => {
  try {
    const existingUser = await User.findOne({ twitterId: id });
    return !!existingUser;
  } catch (error) {
    console.error("Error during Twitter login:", error);
    return false;
  }
};

exports.authRegister = async (req, res) => {
  passport.authenticate("twitter")(req, res);
};

exports.successRegister = async (req, res) => {
  const user = await twitterAuthRegister(req.user);
  if (user) return res.redirect("/generateImg");
  return res.redirect("/signup");
};

exports.successLogin = async (req, res) => {
  const loggedUser = await twitterAuthLogin(req.user.id);
  if (loggedUser) return res.redirect("/generateImg");
  return res.redirect("/signup");
};
