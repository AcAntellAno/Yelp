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

mongoose.connect('mongodb://localhost/yelp');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

app.get('/', (req, res) => {
  res.render('landing');
});

//INDEX => Show all sites
app.get('/campgrounds', (req, res) => {
  //get all locations from DB
  YelpLocation.find({}, (err, YelpLocation) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds: YelpLocation }); //1st campgrounds = name, 2nd is our actual data
    }
  });
});

//CREATE => adds new site to DB
app.post('/campgrounds', (req, res) => {
  //get data from form and add to campgrounds array
  var campName = req.body.campName;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: campName, image: image, description: desc };
  //create a new campground and save to db
  YelpLocation.create(newCampground, (err, YelpLocation) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});

//NEW => show form to make new site
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

//SHOW => Shows more info about one location
app.get('/campgrounds/:id', (req, res) => {
  //find campground with provided ID
  YelpLocation.findById(req.params.id)
    .populate('comments')
    .exec((err, foundLocation) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundLocation);
        //render show template with that campground
        res.render('campgrounds/show', { campgrounds: foundLocation });
      }
    });
});

//Comments Routes

app.get('/campgrounds/:id/comments/new', (req, res) => {
  //find campground by id
  YelpLocation.findById(req.params.id, (err, place) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campgrounds: place });
    }
  });
});

app.post('/campgrounds/:id/comments', (req, res) => {
  YelpLocation.findById(req.params.id, (err, location) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          location.comments.push(comment);
          location.save();
          res.redirect('/campgrounds/' + location._id);
        }
      });
    }
  });
});

app.listen(_PORT, () => {
  console.log('The magic is on port 8080...');
});
