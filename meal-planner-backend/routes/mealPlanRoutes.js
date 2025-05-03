const express = require('express');
const mpCtrl = require('../controllers/mealPlanController');
const router = express.Router();

// create a new weekly or daily plan
router.post('/', mpCtrl.createMealPlan);

// fetch all plans for a user
router.get('/', mpCtrl.listMealPlans);

// get single plan with recipes
router.get('/:id', mpCtrl.getMealPlan);

// update (add/remove recipes or rename)
router.put('/:id', mpCtrl.updateMealPlan);

// delete a plan
router.delete('/:id', mpCtrl.deleteMealPlan);

module.exports = router;
