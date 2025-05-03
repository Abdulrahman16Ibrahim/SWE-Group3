const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // built-in body parser for JSON

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const favoritesRouter = require('./routes/favoritesRoutes');
// … after app.use('/api/users', userRouter) etc.
app.use('/api/favorites', favoritesRouter);


