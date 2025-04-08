const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Register new user
exports.registerUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, dietaryPreferences, calorieGoal, dob } = req.body;

        // Check if user already exists
        const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        await pool.query(
            `INSERT INTO users (email, password_hash, first_name, last_name, dietary_preferences, calorie_goal, dob)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [email, hashedPassword, firstName, lastName, dietaryPreferences, calorieGoal, dob]
        );

        return res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
};

// (Optional) Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user found
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!rows.length) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const user = rows[0];

        // Compare hashed passwords
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // (Optional) Return user data or token
        return res.json({ message: "Login successful!", user: { userId: user.user_id } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
};
