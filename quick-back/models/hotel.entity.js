const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  name: String,
  address: String,
  city: String,
  rating: Number,
  price: Number,
  noOfRooms :[
    {
      roomNo : Number,
      facilities: [],
      noOfPersons: Number,
      isBooked: Boolean
    }
  ],
  image_Url: String
})

module.exports = mongoose.model('Hotel', HotelSchema);
