const path = require("path");
const express = require("express");
const connectDb = require("./config/db.js");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const port = process.env.PORT || 5000;
const viewRoutes = require("./routes/viewRoutes");
const {
  googleAuthRegister,
  googleAuthLogin,
} = require("./controllers/googleAuthContoller.js");
const app = express();
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  }),
);
app.use(passport.initialize());
app.use(passport.session());
//EJS AS RENDER ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //look for views in views folder

//ENABLING BODY PARSER:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ERROR HANDLING MIDDLEWARE
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({ error: "Internal Server Error" });
});
//OAUTH
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/success", async (req, res) => {
  const user = await googleAuthRegister(userProfile);
  const loggedUser = await googleAuthLogin(userProfile.id);
  if (user || loggedUser) return res.redirect("/generateImg");
  return res.redirect("/signup");
});
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    },
  ),
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/success");
  },
);
//STATIC FOLDER:
app.use(express.static(path.join(__dirname, "public")));

app.use("/openai", require("./routes/openaiRoutes"));
app.use("/auth", require("./routes/auth.js"));

app.use(viewRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${port}`),
);
// Connecting to DB

connectDb();

app.use((_req, res, _next) => {
  res.status(404).sendFile(path.join(__dirname, "public/error.html"));
});
