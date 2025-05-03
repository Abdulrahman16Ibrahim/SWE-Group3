const express = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

// GET for search & filtering
router.get('/', recipeController.searchRecipes);

// NEW: view recipe details
router.get('/:id', recipeCtrl.getRecipeById);

// NEW: favorite / unfavorite
router.post('/:id/favorite', interactCtrl.addFavorite);
router.delete('/:id/favorite', interactCtrl.removeFavorite);

// NEW: add rating & review
router.post('/:id/review', interactCtrl.addReview);

module.exports = router;
