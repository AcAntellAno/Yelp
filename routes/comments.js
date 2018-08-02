var express = require('express');
var router = express.Router({ mergeParams: true });
var YelpLocation = require('../models/campground');
var Comment = require('../models/comment');

//Comments New
router.get('/new', isLoggedIn, (req, res) => {
  //find campground by id
  console.log(req.params.id);
  YelpLocation.findById(req.params.id, (err, place) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campgrounds: place });
    }
  });
});

//Comments Create
router.post('/', isLoggedIn, (req, res) => {
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

//Middlewear
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
module.exports = router;
