var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var YelpLocation = require('./models/campground.js');
var Comment = require('./models/comment');
var seedDB = require('./seeds');
var passport = require('passport');
var User = require('./models/User');
var LocalStrategy = require('passport-local');
const _PORT = 8080;

//Require Routes
var commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost/yelp');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

//PASSPORT CONFIG
app.use(
  require('express-session')({
    secret: 'fullstack developmetn ftw',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware for header links
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

app.listen(_PORT, () => {
  console.log('The magic is on port 8080...');
});
