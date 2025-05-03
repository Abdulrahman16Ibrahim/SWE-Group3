const pool = require('../config/db');
const getUserId = (req) => req.body.userId || 1;

/* helper to prevent duplicates in same meal slot */
const checkDuplicate = async (planId, mealDate, mealType) => {
    const [[row]] = await pool.query(
        `SELECT COUNT(*) AS cnt
       FROM meal_plan_recipes
      WHERE plan_id=? AND meal_date=? AND meal_type=?`,
        [planId, mealDate, mealType]);
    return row.cnt > 0;
};

/* ---- create ---- */
exports.createMealPlan = async (req, res) => {
    try {
        const userId = getUserId(req);
        const { planName, startDate, endDate, recipes } = req.body;
        // recipes = [{recipeId, mealDate, mealType}, ...]
        const [result] = await pool.query(
            `INSERT INTO meal_plans (user_id, plan_name, start_date, end_date)
       VALUES (?, ?, ?, ?)`,
            [userId, planName, startDate, endDate]);
        const planId = result.insertId;

        for (const r of recipes) {
            if (await checkDuplicate(planId, r.mealDate, r.mealType)) continue;
            await pool.query(
                `INSERT INTO meal_plan_recipes (plan_id, recipe_id, meal_date, meal_type)
         VALUES (?, ?, ?, ?)`,
                [planId, r.recipeId, r.mealDate, r.mealType]);
        }
        res.status(201).json({ message: 'Meal plan created.', planId });
    } catch (err) {
        console.error(err); res.status(500).json({ message: 'Server error.'});
    }
};

/* ---- list plans ---- */
exports.listMealPlans = async (req, res) => {
    try {
        const userId = getUserId(req);
        const [rows] = await pool.query(
            'SELECT * FROM meal_plans WHERE user_id = ? ORDER BY created_at DESC',
            [userId]);
        res.json(rows);
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error.'}); }
};

/* ---- get single plan with recipes ---- */
exports.getMealPlan = async (req, res) => {
    try {
        const planId = req.params.id;
        const [[plan]] = await pool.query('SELECT * FROM meal_plans WHERE plan_id = ?', [planId]);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        const [items] = await pool.query(
            `SELECT mpr.*, r.recipe_name
         FROM meal_plan_recipes mpr
         JOIN recipes r ON r.recipe_id = mpr.recipe_id
        WHERE plan_id = ? ORDER BY meal_date, meal_type`,
            [planId]);
        res.json({ ...plan, recipes: items });
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error.'}); }
};

// /* ---- update or delete functions (abbreviated) ---- */
// exports.updateMealPlan = /* similar pattern */;
// exports.deleteMealPlan = /* similar pattern */;
