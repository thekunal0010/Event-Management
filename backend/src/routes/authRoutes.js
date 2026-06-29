const express = require('express');
const { register, login, getCurrentUser, updateProfile, getUserById } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);
router.put('/profile', authenticate, upload.single('avatar'), updateProfile);
router.get('/user/:id', getUserById);

module.exports = router;
