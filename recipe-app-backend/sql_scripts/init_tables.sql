CREATE DATABASE IF NOT EXISTS meal_planner_db;
USE meal_planner_db;

CREATE TABLE IF NOT EXISTS users (
                                     user_id INT AUTO_INCREMENT PRIMARY KEY,
                                     email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    dietary_preferences TEXT,
    calorie_goal INT,
    dob DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS recipes (
                                       recipe_id INT AUTO_INCREMENT PRIMARY KEY,
                                       recipe_name VARCHAR(255) NOT NULL,
    cuisine_type VARCHAR(100),
    cooking_time INT,
    difficulty VARCHAR(50),
    nutritional_info TEXT,
    instructions TEXT,
    rating INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
