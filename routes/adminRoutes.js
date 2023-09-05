const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define admin-related routes
router.post('/login', adminController.adminLogin);
router.get('/total-users', adminController.getTotalUsers);
router.get('/registered-slots', adminController.getRegisteredSlotsByDay);

module.exports = router;
