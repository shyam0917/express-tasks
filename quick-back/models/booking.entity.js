const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  hotel:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Hotel"
  }],
  roomIds: [],
  role: {
    type: String,
    required: true
  },
},{
    timestamps: true
});



// Export the model
module.exports = mongoose.model('Booking', BookingSchema);
