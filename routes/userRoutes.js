// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//User Registration API
router.post('/register', userController.register);

//User Login API
router.post('/login', userController.login);

module.exports = router;
