var YelpLocation = require('../models/campground');
var Comment = require('../models/comment');
//all app middleware
var middlewareObject = {};

middlewareObject.checkCampgroundOwndership = (req, res, next) => {
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

middlewareObject.checkCommentOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                console.log(err);
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
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

middlewareObject.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', "Please Login First");
    res.redirect('/login');

}


module.exports = middlewareObject;