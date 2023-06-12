const passport = require("passport");
let User = require("../models/users");
exports.googleAuthRegister = async (profile) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return true;
    } else {
      const newUser = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
      await newUser.save();
      return true;
    }
  } catch (error) {
    return false;
  }
};
exports.googleAuthLogin = async (id) => {
  try {
    const existingUser = await User.findOne({ googleId: id });
    if (existingUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

exports.authRegister = async (req, res) => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};
exports.successRegister=async(req,res)=>{
  const user = await googleAuthRegister(userProfile);
  if (user) return res.redirect("/generateImg");
  return res.redirect("/signup");
};
exports.successLogin = async (req, res) => {
  const loggedUser = await googleAuthLogin(userProfile.id);
  if (loggedUser) return res.redirect("/generateImg");
  return res.redirect("/signup");
};
