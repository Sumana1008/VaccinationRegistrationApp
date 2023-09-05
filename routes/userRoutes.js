const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define user-related routes
router.post('/register', userController.registerUser);
router.post('/login', userController.userLogin);
router.get('/slots', userController.listAvailableSlots);
router.post('/slots/register', userController.registerSlot);
router.put('/slots/update', userController.updateSlot);

module.exports = router;
