const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const bookingController = require('../controllers/booking');

router.post('/',bookingController.booking_create_booking);
router.get('/', checkAuth, bookingController.bookings_get_all);
router.get('/:bookingId', bookingController.bookings_get_booking);
router.delete('/:bookingId', checkAuth, bookingController.bookings_delete_booking);

module.exports = router;