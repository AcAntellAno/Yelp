var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var YelpLocation = require('./models/campground.js');
const _PORT = 8080;

mongoose.connect('mongodb://localhost/yelp');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

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
      res.render('index', { campgrounds: YelpLocation }); //1st campgrounds = name, 2nd is our actual data
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
  res.render('new.ejs');
});

//SHOW => Shows more info about one location
app.get('/campgrounds/:id', (req, res) => {
  //find campground with provided ID
  YelpLocation.findById(req.params.id, (err, foundLocation) => {
    if (err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render('show', { campgrounds: foundLocation });
    }
  });
});

app.listen(_PORT, () => {
  console.log('The magic is on port 8080...');
});
