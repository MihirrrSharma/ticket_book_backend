const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

router.get('/getSeats', seatController.getSeats); //GET route
router.post('/bookSeats', seatController.bookSeats); //POST route

module.exports = router;
