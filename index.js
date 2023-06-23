const path = require("path");
const express = require("express");
const connectDb = require("./config/db.js");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const mongoose = require('mongoose');
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const port = process.env.PORT || 5000;
const viewRoutes = require("./routes/viewRoutes");
// const {googleAuthRegister, googleAuthLogin,} = require("./controllers/googleAuthContoller.js");
const app = express();
//EJS AS RENDER ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //look for views in views folder

//ENABLING BODY PARSER:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(passport.initialize());
app.use(passport.session());
const userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  },
});
// Connecting to DB

connectDb();
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
// ERROR HANDLING MIDDLEWARE
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({ error: "Internal Server Error" });
});
//OAUTH
app.get("/success", async (req, res) => {
  const user = await googleAuthRegister(userProfile);
  const loggedUser=await googleAuthLogin(userProfile.id);
  if (user||loggedUser) return res.redirect("/generateImg");
  return res.redirect("/signup");
});
app.get("/error", (req, res) => res.send("error logging in"));
const User = new mongoose.model('User', userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://imagine-ai-17zf.vercel.app/auth/google/callback",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  scope: ["profile","email"]
}, function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({
    googleId: profile.id
  }, function(err, user) {
    return cb(err, user);
  });
}));

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/generateImg");
  }
);
//STATIC FOLDER:
app.use(express.static(path.join(__dirname, "public")));

app.use("/openai", require("./routes/openaiRoutes"));
app.use("/auth", require("./routes/auth.js"));

app.use(viewRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${port}`)
);

app.use((_req, res, _next) => {
  res.status(404).sendFile(path.join(__dirname, "public/error.html"));
});
