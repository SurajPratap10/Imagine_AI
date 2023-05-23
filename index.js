const path = require('path');
const express = require('express');
require('dotenv').config();
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const port = process.env.PORT || 5000;
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
//ENABLING BODY PARSER:
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
//STATIC FOLDER:
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "OpenAI",
  resave: false,
  saveUninitialized: false,
}));
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
  githubId: {
    type: String
  }
});
async function run() {
  await mongoose.connect(process.env.URL); // Works!
}
run();
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
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
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/generate",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({
    googleId: profile.id
  }, function(err, user) {
    return cb(err, user);
  });
}));
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/generate"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));


// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    error: 'Internal Server Error'
  })
});
app.route('/')
  .get(function(req, res) {
    res.render("home");
  });
app.route('/auth/google')
  .get(passport.authenticate('google', {
    scope: ["profile"]
  }));
app.route('/auth/google/generate')
  .get(passport.authenticate('google', {
    failureRedirect: '/login'
  }), (req, res) => {
    res.redirect('/generate');
  });
  app.route('/auth/github')
    .get(passport.authenticate('github', {
      scope: ["profile"]
    }));
  app.route('/auth/github/generate')
    .get(passport.authenticate('github', {
      failureRedirect: '/login'
    }), (req, res) => {
      res.redirect('/generate');
    });
app.route('/login')
  .get(function(req, res) {
    res.render("login");
  })
  .post(function(req, res) {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, function(err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/generate");
        });
      }
    })
  });
app.route('/register')
  .get(function(req, res) {
    res.render("register");
  })
  .post(function(req, res) {
    User.register({
      username: req.body.username
    }, req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/generate");
        });
      }
    });
  });
app.route("/generate")
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      res.render("generate");
    } else {
      res.redirect("/login");
    }
  });
app.route("/logout")
  .get(function(req, res) {
    req.logout(function(err) {
      console.log(err);
    });
    res.redirect("/");
  });
// app.use('/openai', require('./routes/openaiRoutes'));
app.listen(process.env.PORT, () => console.log(`Server started on port ${port}`));
