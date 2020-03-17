const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  name: String,
  address: String,
  city: String,
  noOfRooms: Number,
  image_Url: String
})

module.exports = mongoose.model('Hotel', HotelSchema);
