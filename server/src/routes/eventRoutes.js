const express = require('express');
const { addNote, addEvent, getEvents, deleteEvent } = require('../controllers/eventController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/note', protect, adminOnly, addNote);
router.post('/event', protect, adminOnly, addEvent);
router.post('/delete', protect, adminOnly, deleteEvent);
router.get('/all', protect, getEvents);

module.exports = router;
