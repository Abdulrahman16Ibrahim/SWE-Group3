const pool = require('../config/db');

// GET /api/recipes?cuisine=Italian&maxTime=30&difficulty=Easy
exports.searchRecipes = async (req, res) => {
    try {
        const { cuisine, maxTime, difficulty } = req.query;
        let sql = "SELECT * FROM recipes WHERE 1=1";
        const params = [];

        if (cuisine) {
            sql += " AND cuisine_type = ?";
            params.push(cuisine);
        }
        if (maxTime) {
            sql += " AND cooking_time <= ?";
            params.push(parseInt(maxTime));
        }
        if (difficulty) {
            sql += " AND difficulty = ?";
            params.push(difficulty);
        }

        const [results] = await pool.query(sql, params);

        if (!results.length) {
            // Return an alternate response if none found
            return res.status(200).json({ message: "No matching recipes found", data: [] });
        }

        return res.json({ data: results });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const [[recipe]] = await pool.query('SELECT * FROM recipes WHERE recipe_id = ?', [recipeId]);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

        // fetch allergens (if any)
        const [allergens] = await pool.query(
            `SELECT a.allergen_name
         FROM allergens a
         JOIN recipe_allergens ra ON ra.allergen_id = a.allergen_id
        WHERE ra.recipe_id = ?`, [recipeId]);

        // fetch average rating
        const [[avg]] = await pool.query(
            'SELECT AVG(rating) AS avgRating, COUNT(*) AS numReviews FROM recipe_reviews WHERE recipe_id = ?',
            [recipeId]);

        res.json({
            ...recipe,
            allergens: allergens.map(r => r.allergen_name),
            avgRating: avg.avgRating || 0,
            reviewsCount: avg.numReviews || 0
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};
