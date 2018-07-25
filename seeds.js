let mongoose = require('mongoose');
let YelpLocation = require('./models/campground');
let Comment = require('./models/comment');
var data = [
  {
    name: "Cloud's Rest",
    image:
      'https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=1350&q=80',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dicta iure autem, qui expedita corrupti, similique minima ipsa maxime fugit pariatur? Praesentium ullam eum debitis nihil magni exercitationem mollitia nisi?'
  },
  {
    name: 'YeeHah Ridge',
    image:
      'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&s=73115e54fa3d099fcb2d92ccf12eee41&auto=format&fit=crop&w=1353&q=80',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dicta iure autem, qui expedita corrupti, similique minima ipsa maxime fugit pariatur? Praesentium ullam eum debitis nihil magni exercitationem mollitia nisi?'
  },
  {
    name: 'Desert Mesa',
    image:
      'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&s=dd23e6038cd7a8421453675bd5695062&auto=format&fit=crop&w=1259&q=80',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dicta iure autem, qui expedita corrupti, similique minima ipsa maxime fugit pariatur? Praesentium ullam eum debitis nihil magni exercitationem mollitia nisi?'
  },
  {
    name: 'Mocking Hill',
    image:
      'https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-0.3.5&s=e288f700a591363b6de6fefc12bcd183&auto=format&fit=crop&w=1350&q=80',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dicta iure autem, qui expedita corrupti, similique minima ipsa maxime fugit pariatur? Praesentium ullam eum debitis nihil magni exercitationem mollitia nisi?'
  },
  {
    name: 'Canyon Run',
    image:
      'https://images.unsplash.com/photo-1439123414876-0717652a92a9?ixlib=rb-0.3.5&s=702128537f7e663b6402aa4223a6ebc2&auto=format&fit=crop&w=1352&q=80',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dicta iure autem, qui expedita corrupti, similique minima ipsa maxime fugit pariatur? Praesentium ullam eum debitis nihil magni exercitationem mollitia nisi?'
  },
  {
    name: 'Pizzha Hill',
    image:
      'https://images.unsplash.com/photo-1437382944886-45a9f73d4158?ixlib=rb-0.3.5&s=79b05b65d4a430c72cdfa0f7ff74fa92&auto=format&fit=crop&w=1350&q=80',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dicta iure autem, qui expedita corrupti, similique minima ipsa maxime fugit pariatur? Praesentium ullam eum debitis nihil magni exercitationem mollitia nisi?'
  }
];

function seedDB() {
  //remove campgrounds
  YelpLocation.remove({}, err => {
    if (err) {
      console.log(err);
    }
    console.log('Removed campgrounds');
    //add a few campgrounds
    data.forEach(seed => {
      YelpLocation.create(seed, (err, location) => {
        if (err) {
          console.log(err);
        } else {
          console.log('added location');
          //create a comment
          Comment.create(
            {
              text:
                'This is a really cool place, but no bathrooms...gotta dig a hole',
              author: 'Homer'
            },
            (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                location.comments.push(comment);
                location.save();
                console.log('created new comment');
              }
            }
          );
        }
      });
    });
  });

  //add a few comments
}

module.exports = seedDB;
