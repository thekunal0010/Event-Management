const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
  getUserEvents,
  getEventStats,
} = require('../controllers/eventController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getAllEvents);
router.get('/stats', authenticate, getEventStats);
router.post('/create', authenticate, upload.single('image'), createEvent);
router.get('/user-events', authenticate, getUserEvents);
router.get('/:id', getEventById);
router.put('/:id', authenticate, upload.single('image'), updateEvent);
router.delete('/:id', authenticate, deleteEvent);
router.post('/:id/join', authenticate, joinEvent);
router.post('/:id/leave', authenticate, leaveEvent);

module.exports = router;
