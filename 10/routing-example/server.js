const express = require('express'),
  http = require('http'),
  passport = require('passport'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  LocalStrategy = require('passport-local'),
  serverStatic = require('serve-static'),
  FIFA = require('./fifa').FIFA;

const USER = {
  username: 'admin',
  password: 'admin'
};

const app = express();
app.use(morgan('dev'));
app.use(compress());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(methodOverride());
app.use(cookieParser());

app.use(session({
  secret: 'almvnirtgd#$DFsa25452*AYD*D*S!@!#adsda))Ddsadsax',
  cookie: {httpOnly: true, secure: false, maxAge: 86400000},
  store: new session.MemoryStore()
}));

app.use(passport.initialize());
app.use(session());

passport.use(new LocalStrategy((username, password, done) => {
  if (USER.username === username) {
    if (password === USER.password) {
      done(null, USER)
    } else {
      done(null, false, {msg: 'Incorrect Password'})
    }
  } else {
    done(null, false, {msg: `Could not find user with username ${username}`})
  }
}));

app.use('/', serverStatic(`${__dirname}/app`));

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.send({
      msg: 'Please login to access this information'
    }, 400)
  }
};

app.get('/api/team', (req, res) => {
  res.send(FIFA.TEAMS_LIST)
});

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.send({loginStatus: false, msg: 'Unable to Login'}, 400);
    req.login(user, err => {
      if (err) return res.send({msg: 'Error logging in', err: err}, 500);
      return res.send({loginStatus: true, user: user})
    })
  })(req, res, next)
});

app.get('/api/session', isLoggedIn, (req, res) => {
  res.send({
    loginStatus: true,
    user: req.user
  })
});

app.get('/api/team/:code', isLoggedIn, (req, res) => {
  const code = req.params.code;
  res.send(FIFA.TEAM_DETAILS[code])
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/#!/login')
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
console.log(`Running at http://localhost:${PORT}`);
