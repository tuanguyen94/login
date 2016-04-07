var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var User = require('./model/userModel');

var routes = require('./routes/index');
var usersRoute = require('./routes/usersRoute');
var passportRoute = require('./routes/passportRoute');
var commentRoute = require('./routes/commentRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongodb driver
const mongoose = require('mongoose');
var db = require('./config/database');
mongoose.connect(db.url);

app.use(session({
  secret: 'secret',
  cookie: { httpOnly: false },
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({
    mongooseConnection: mongoose.connection
    //createdAt:  new Date()
    //autoRemove: 'native',
    //ttl: 1
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', usersRoute);
app.use('/passport', passportRoute);
app.use('/comment', commentRoute);


//config for passport
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');


passport.serializeUser(function(user, done) {   //dua du lieu vao session
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {   //su dung thong tin trong session //lay du lieu day du, gan vao req.user
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
    function (username,password,done) {   //query database
      User.findOne({
        username: username,
        password:password
      }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        return done(null, user);
      });
      /*
      db.user.find({where : {
        username : username
      }}).then(function (user) {
        bcrypt.compare(password, user.password, function (err,result) {
          if (err) { return done(err); }
          if(!result) {
            return done(null, false, { message: 'Incorrect username and password' });
          }
          return done(null, user);
        })
      }).catch(function (err) {
        return done(err);
      })
      */
    }
));


app.post('/users/login',
    passport.authenticate('local', { failureRedirect: '/users/login' }),
    function(req, res) {
      res.redirect('/');
    });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





module.exports = app;
