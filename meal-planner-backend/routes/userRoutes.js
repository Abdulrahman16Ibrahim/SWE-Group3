const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Register route
router.post('/register', userController.registerUser);

// (Optionally) Login route
router.post('/login', userController.loginUser);

module.exports = router;
