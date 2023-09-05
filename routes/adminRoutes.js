// adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Admin login
router.post('/login', adminController.login);

// Protected routes (require admin authentication)
router.use(authMiddleware.adminAuth);

// Admin statistics
router.get('/statistics', adminController.getStatistics);

// Slot management (Example: Listing all slots)
router.get('/slots', slotController.listAllSlots);

module.exports = router;
