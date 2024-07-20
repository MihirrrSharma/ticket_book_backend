// controllers/seatController.js
const mongoose = require('mongoose');
const Seat = require('../models/seatModel');

exports.getSeats = async (req, res) => {
    try {
        const seats = await Seat.find({});
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching seats', error });
    }
};

exports.bookSeats = async (req, res) => {
    const { numSeats } = req.body;
    console.log(numSeats);

    if (numSeats < 1 || numSeats > 7) {
        return res.status(400).json({ success: false, message: 'You can only reserve between 1 and 7 seats at a time' });
    }

    try {
        // Fetch available seats
        const availableSeats = await Seat.find({ reserved: false }).sort('seatNumber').limit(numSeats);
        console.log(availableSeats);

        if (availableSeats.length < numSeats) {
            return res.status(400).json({ success: false, message: 'Not enough seats available' });
        }

        // Book the seats
        const bookingId = new mongoose.Types.ObjectId();
        const seatNumbers = availableSeats.map(seat => seat.seatNumber);
        console.log(bookingId, seatNumbers);

        const response = await Seat.updateMany(
            { _id: { $in: availableSeats.map(seat => seat._id) } },
            { reserved: true, bookingId }
        );
        console.log("response of book seats: ", response);

        res.status(200).json({ success: true, message: 'Seats booked successfully.', seatNumbers });
    } catch (error) {
        console.log('Error booking seats:', error);
        res.status(500).json({ success: false, message: 'Error booking seats', error: error.message });
    }
};
