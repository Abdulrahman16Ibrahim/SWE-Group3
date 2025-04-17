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


/* --- Allergens & mapping -------------------------------------------- */
CREATE TABLE IF NOT EXISTS allergens (
                                         allergen_id INT AUTO_INCREMENT PRIMARY KEY,
                                         allergen_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe_allergens (
                                                recipe_id   INT       NOT NULL,
                                                allergen_id INT       NOT NULL,
                                                PRIMARY KEY (recipe_id, allergen_id),
                                                FOREIGN KEY (recipe_id)   REFERENCES recipes(recipe_id)   ON DELETE CASCADE,
                                                FOREIGN KEY (allergen_id) REFERENCES allergens(allergen_id) ON DELETE CASCADE
);

/* --- Favorites ------------------------------------------------------- */
CREATE TABLE IF NOT EXISTS favorites (
                                         favorite_id INT AUTO_INCREMENT PRIMARY KEY,
                                         user_id     INT NOT NULL,
                                         recipe_id   INT NOT NULL,
                                         created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
                                         UNIQUE KEY user_recipe (user_id, recipe_id),
                                         FOREIGN KEY (user_id)  REFERENCES users(user_id)  ON DELETE CASCADE,
                                         FOREIGN KEY (recipe_id)REFERENCES recipes(recipe_id)ON DELETE CASCADE
);

/* --- Ratings / Reviews ---------------------------------------------- */
CREATE TABLE IF NOT EXISTS recipe_reviews (
                                              review_id  INT AUTO_INCREMENT PRIMARY KEY,
                                              user_id    INT NOT NULL,
                                              recipe_id  INT NOT NULL,
                                              rating     INT CHECK (rating BETWEEN 1 AND 5),
                                              comment    TEXT,
                                              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                              FOREIGN KEY (user_id)  REFERENCES users(user_id)  ON DELETE CASCADE,
                                              FOREIGN KEY (recipe_id)REFERENCES recipes(recipe_id)ON DELETE CASCADE
);

/* --- Meal‑planning --------------------------------------------------- */
CREATE TABLE IF NOT EXISTS meal_plans (
                                          plan_id    INT AUTO_INCREMENT PRIMARY KEY,
                                          user_id    INT NOT NULL,
                                          plan_name  VARCHAR(100),
                                          start_date DATE NOT NULL,
                                          end_date   DATE NOT NULL,
                                          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                          FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS meal_plan_recipes (
                                                 plan_rec_id INT AUTO_INCREMENT PRIMARY KEY,
                                                 plan_id     INT NOT NULL,
                                                 recipe_id   INT NOT NULL,
                                                 meal_date   DATE NOT NULL,
                                                 meal_type   ENUM('breakfast','lunch','dinner','snack') NOT NULL,
                                                 UNIQUE KEY plan_meal_unique (plan_id, meal_date, meal_type),      -- avoid duplicates
                                                 FOREIGN KEY (plan_id)  REFERENCES meal_plans(plan_id)  ON DELETE CASCADE,
                                                 FOREIGN KEY (recipe_id)REFERENCES recipes(recipe_id)  ON DELETE CASCADE
);
