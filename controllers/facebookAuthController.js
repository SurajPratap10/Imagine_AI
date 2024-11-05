const passport = require("passport");
const User = require("../models/users");

exports.facebookAuthRegister = async (profile) => {
  try {
    const existingUser = await User.findOne({ facebookId: profile.id });

    if (existingUser) {
      return true;
    } else {
      const newUser = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        facebookId: profile.id,
      });
      await newUser.save();
      return true;
    }
  } catch (error) {
    console.error("Error during Facebook registration:", error);
    return false;
  }
};

exports.facebookAuthLogin = async (id) => {
  try {
    const existingUser = await User.findOne({ facebookId: id });
    return !!existingUser;
  } catch (error) {
    console.error("Error during Facebook login:", error);
    return false;
  }
};

exports.authRegister = async (req, res) => {
  passport.authenticate("facebook", { scope: ["email"] })(req, res);
};

exports.successRegister = async (req, res) => {
  const user = await facebookAuthRegister(req.user);
  if (user) return res.redirect("/generateImg");
  return res.redirect("/signup");
};

exports.successLogin = async (req, res) => {
  const loggedUser = await facebookAuthLogin(req.user.id);
  if (loggedUser) return res.redirect("/generateImg");
  return res.redirect("/signup");
};
