const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController.js');
const authenticateToken = require('../middleware/authMiddleware.js');
const authorize = require('../middleware/roleMiddleware.js');

router.get('/',
    authenticateToken,
    authorize('admin', 'librarian'),
    ReservationController.getAllReservations
);
router.get('/member/:member_id',
    authenticateToken,
    authorize('admin', 'librarian', 'member'),
    ReservationController.getReservationsByMember
);
router.get('/:id',
    authenticateToken,
    authorize('admin', 'librarian'),
    ReservationController.getReservationById
);
router.post('/',
    authenticateToken,
    authorize('admin', 'librarian', 'member'),
    ReservationController.createReservation
);
router.put('/:id/cancel',
    authenticateToken,
    authorize('admin', 'librarian', 'member'),
    ReservationController.cancelReservation
);
router.put('/:id/fulfill',
    authenticateToken,
    authorize('admin', 'librarian'),
    ReservationController.fulfillReservation
);

module.exports = router;