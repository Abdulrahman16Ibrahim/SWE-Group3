const pool = require('../config/db');

// assume you retrieve userId from session / token; here we use body for demo
const getUserId = (req) => req.body.userId || 1;

/* ----- Favorites ----- */
exports.addFavorite = async (req, res) => {
    try {
        const userId   = getUserId(req);
        const recipeId = req.params.id;
        await pool.query(
            'INSERT IGNORE INTO favorites (user_id, recipe_id) VALUES (?, ?)',
            [userId, recipeId]
        );
        res.status(201).json({ message: 'Recipe added to favorites.' });
    } catch (err) {
        console.error(err); res.status(500).json({ message: 'Server error.'});
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const userId   = getUserId(req);
        const recipeId = req.params.id;
        await pool.query(
            'DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?',
            [userId, recipeId]
        );
        res.json({ message: 'Removed from favorites.' });
    } catch (err) {
        console.error(err); res.status(500).json({ message: 'Server error.'});
    }
};

/* ----- Ratings / Reviews ----- */
exports.addReview = async (req, res) => {
    try {
        const userId   = getUserId(req);
        const recipeId = req.params.id;
        const { rating, comment } = req.body;
        await pool.query(
            `INSERT INTO recipe_reviews (user_id, recipe_id, rating, comment)
       VALUES (?, ?, ?, ?)`,
            [userId, recipeId, rating, comment]
        );
        res.status(201).json({ message: 'Review added.' });
    } catch (err) {
        console.error(err); res.status(500).json({ message: 'Server error.'});
    }
};
