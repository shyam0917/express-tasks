const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  hotel:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Hotel"
  }],
  roomNo: Number,
  categoryId: String,
  categoryType: String
},{
    timestamps: true
});



// Export the model
module.exports = mongoose.model('Booking', BookingSchema);
