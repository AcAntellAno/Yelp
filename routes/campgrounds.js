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
router.post('/', isLoggedIn, (req, res) => {
  //get data from form and add to campgrounds array
  var campName = req.body.campName;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: campName,
    image: image,
    description: desc,
    author: author
  };
  //create a new campground and save to db
  YelpLocation.create(newCampground, (err, YelpLocation) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      console.log(YelpLocation);
      res.redirect('/campgrounds');
    }
  });
});

//NEW => show form to make new site
router.get('/new', isLoggedIn, (req, res) => {
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

//Edit Campground Route
router.get('/:id/edit', checkCampgroundOwndership, (req, res) => {
  //is user logged in
  YelpLocation.findById(req.params.id, (err, foundCampground) => {
    res.render('campgrounds/edit', { campground: foundCampground });
  });
});

//Update campground route

router.put('/:id', checkCampgroundOwndership, (req, res) => {
  //find and update correct campground
  YelpLocation.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCampground) => {
      if (err) {
        res.redirect('/campgrounds');
      } else {
        res.redirect('/campgrounds/' + req.params.id);
      }
    }
  );
});

//Destroy Route
router.delete('/:id', checkCampgroundOwndership, (req, res) => {
  YelpLocation.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

//Middlewear
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkCampgroundOwndership(req, res, next) {
  if (req.isAuthenticated()) {
    YelpLocation.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else {
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
}

module.exports = router;
