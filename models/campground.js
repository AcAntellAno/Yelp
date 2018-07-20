var mongoose = require('mongoose');
//DB Schema
var yelpSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model('YelpLocation', yelpSchema);
