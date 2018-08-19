var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var YelpLocation = require('./models/campground.js');
var Comment = require('./models/comment');
var seedDB = require('./seeds');
var passport = require('passport');
var User = require('./models/User');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
//const _PORT = 8080;

//Require Routes
var commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  indexRoutes = require('./routes/index');

var url = process.env.DATABASEURL || 'mongodb://localhost/yelp'
mongoose.connect(url);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
//seedDB();

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
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log('The magic is on port 8080...');
});