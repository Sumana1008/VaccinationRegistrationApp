// slotRoutes.js
const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const authMiddleware = require('../middlewares/authMiddleware');

// List available slots
router.get('/available', slotController.listAvailableSlots);

// Register for a slot (Example)
router.post('/register', authMiddleware.userAuth, slotController.registerSlot);

// Update a registered slot (Example)
router.put('/update/:slotId', authMiddleware.userAuth, slotController.updateSlot);

module.exports = router;
