const express = require('express');
const userController = require('../controllers/userController');
console.log("userController exports:", userController);

const router = express.Router();

// Register route
router.post('/register', userController.registerUser);

// (Optionally) Login route
router.post('/login', userController.loginUser);

//Preferences router
router.put('/preferences', userController.updatePreferences);

module.exports = router;
