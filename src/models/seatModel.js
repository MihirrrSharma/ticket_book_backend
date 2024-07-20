const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatNumber: { type: Number, required: true },
    reserved: { type: Boolean, required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null }
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
