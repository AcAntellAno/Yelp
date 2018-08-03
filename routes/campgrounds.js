var express = require('express');
var router = express.Router();
var YelpLocation = require('../models/campground');
//INDEX => Show all sites
router.get('/', (req, res) => {
  //get all locations from DBs
  YelpLocation.find({}, (err, YelpLocation) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds: YelpLocation }); //1st campgrounds = name, 2nd is our actual data
    }
  });
});

//CREATE => adds new site to DB
router.post('/', (req, res) => {
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
router.get('/new', (req, res) => {
  res.render('campgrounds/new');
});

//SHOW => Shows more info about one location
router.get('/:id', (req, res) => {
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

module.exports = router;