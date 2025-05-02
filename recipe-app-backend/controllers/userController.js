const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, dietaryPreferences, calorieGoal, dob } = req.body;

    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, dietary_preferences, calorie_goal, dob)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, firstName, lastName, dietaryPreferences, calorieGoal, dob]
    );

    const newUserId = result.insertId;
    console.log("New user registered:", newUserId);

    return res.status(201).json({ message: "User registered successfully.", user_id: newUserId });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    return res.json({ message: "Login successful!", user: { userId: user.user_id } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

// Update Preferences
exports.updatePreferences = async (req, res) => {
  const {
    user_id, // coming from frontend
    dietaryPreferences,
    allergies,
    skillLevel,
    cookFrequency,
    mealTypes
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE users SET 
        dietary_preferences = ?, 
        allergies = ?, 
        skill_level = ?, 
        cook_frequency = ?, 
        meal_types = ?
       WHERE user_id = ?`,
      [
        dietaryPreferences,
        allergies,
        skillLevel,
        cookFrequency,
        mealTypes,
        user_id
      ]
    );

    if (result.affectedRows === 0) {
      console.warn("No user was updated — invalid user_id?");
      return res.status(404).json({ message: "User not found. Preferences not saved." });
    }

    res.json({ message: "Preferences saved!" });
  } catch (err) {
    console.error("Error updating preferences:", err);
    res.status(500).json({ message: "Failed to save preferences" });
  }
};
