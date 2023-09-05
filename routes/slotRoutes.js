// slotRoutes.js
const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const authMiddleware = require('../middlewares/authMiddleware');

// List available slots
// List available vaccine slots for a given day
router.get('/list-available', slotController.listAvailableSlots);

// Register a user for a vaccine slot
router.post('/register', slotController.registerSlot);

// Update a registered vaccine slot
router.put('/update', slotController.updateSlot);

module.exports = router;
