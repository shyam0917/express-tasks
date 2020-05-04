const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  name: String,
  address: String,
  city: String,
  rating: Number,
  description: String,
  checkinDetails: [],
  noOfRooms: [
    {
      availableRooms: [],
      facilities: [],
      noOfPersons: Number,
      discount: Number,
      price: Number,
      validFor: String,
      categoryType: String,
      bedType: String
    }
  ],
  image_Url: String
})

module.exports = mongoose.model('Hotel', HotelSchema);
