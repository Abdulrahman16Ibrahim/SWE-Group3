// recipe-app-backend/routes/MealPlanRoutes.js
const express = require('express');
const router = express.Router();

// In‑memory store
let savedPlans = [];

// Create a new meal plan
router.post('/', (req, res) => {
  const { userId, mealPlan } = req.body;
  if (!userId || !mealPlan) {
    return res.status(400).json({ error: 'userId and mealPlan required' });
  }
  const id = savedPlans.length + 1;
  savedPlans.push({ id, userId, plan: mealPlan });
  res.status(201).json({ success: true, id });
});

// Get all plans for a given user
router.get('/', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  const userPlans = savedPlans.filter(p => String(p.userId) === String(userId));
  res.json({ data: userPlans });
});

module.exports = router;
