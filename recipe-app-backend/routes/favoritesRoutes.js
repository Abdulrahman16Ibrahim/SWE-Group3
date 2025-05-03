// routes/favorites.js
const express = require('express');
const router = express.Router();
const favCtrl = require('../controllers/favoritesController');

router.post('/',   favCtrl.saveFavorite);
router.get('/',    favCtrl.getFavorites);
router.delete('/', favCtrl.deleteFavorite);  // optional

module.exports = router;



