const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Defined user-related routes,it imports the 'userController' to handle user related actions
router.post('/register', userController.registerUser);
router.post('/login', userController.userLogin);
router.get('/slots', userController.listAvailableSlots);
router.post('/slots/register', userController.registerSlot);
router.put('/slots/update', userController.updateSlot);

module.exports = router;
