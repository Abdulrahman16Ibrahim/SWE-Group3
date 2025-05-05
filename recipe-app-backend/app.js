// app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const favoritesRouter = require('./routes/favoritesRoutes');
const mealPlanRouter = require('./routes/MealPlanRoutes');

const app = express();

app.get('/api/ping', (req, res) => res.json({ status: 'OK' }));

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorites', favoritesRouter);
app.use('/api/mealplans', mealPlanRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
