// controllers/favoritesController.js
const pool = require('../config/db');

// 1) Save a recipe
exports.saveFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    // check duplicate
    const [[exists]] = await pool.query(
      `SELECT 1 FROM favorites WHERE user_id = ? AND recipe_id = ?`,
      [userId, recipeId]
    );
    if (exists) {
      return res.status(400).json({ message: 'Recipe already saved.' });
    }
    // insert
    await pool.query(
      `INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)`,
      [userId, recipeId]
    );
    return res.status(201).json({ message: 'Recipe saved!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// 2) Get all saved recipes for a user
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.query.userId;
    const [rows] = await pool.query(
      `SELECT r.* 
       FROM recipes AS r
       JOIN favorites AS f ON r.recipe_id = f.recipe_id
       WHERE f.user_id = ?`,
      [userId]
    );
    return res.json({ data: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

//Un-save a recipe
exports.deleteFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    const [result] = await pool.query(
      `DELETE FROM favorites 
       WHERE user_id = ? AND recipe_id = ?`,
      [userId, recipeId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Not found.' });
    }
    return res.json({ message: 'Recipe removed.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};
