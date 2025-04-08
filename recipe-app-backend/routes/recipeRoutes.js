const express = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

// Route for searching recipes
router.get('/', recipeController.searchRecipes);

// NEW: Route for fetching a single recipe by its id
router.get('/:id', recipeController.getRecipeById);

module.exports = router;
