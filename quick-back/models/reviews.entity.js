const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    hotelId: {
        type: String,
        required: true
    },
    title: String,
    comments: String,
    rating: Number
}, {
    timestamps: true
});



// Export the model
module.exports = mongoose.model('Booking', BookingSchema);
