const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

router.get('/getSeats', seatController.getSeats);
router.post('/bookSeats', seatController.bookSeats);

module.exports = router;
