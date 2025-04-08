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
            return res.status(200).json({ message: "No matching recipes found", data: [] });
        }

        return res.json({ data: results });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
};

// NEW: GET /api/recipes/:id to fetch a recipe by its id
exports.getRecipeById = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await pool.query("SELECT * FROM recipes WHERE recipe_id = ?", [id]);
        if (!rows.length) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.json({ data: rows[0] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
};
