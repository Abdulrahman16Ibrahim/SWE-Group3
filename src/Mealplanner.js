import React, { useState } from 'react';
import './MealPlanner.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const sampleRecipes = [
  'Grilled Chicken Salad',
  'Veggie Stir Fry',
  'Spaghetti Bolognese',
  'Quinoa Bowl',
  'Paneer Tikka',
  'Fish Curry',
  'Mushroom Risotto',
];

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: '' }), {})
  );

  const handleChange = (day, recipe) => {
    setMealPlan({ ...mealPlan, [day]: recipe });
  };

  return (
    <div className="meal-planner">
      <h2>Weekly Meal Planner</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Meal</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => (
            <tr key={day}>
              <td>{day}</td>
              <td>
                <select value={mealPlan[day]} onChange={(e) => handleChange(day, e.target.value)}>
                  <option value="">Select a Recipe</option>
                  {sampleRecipes.map((recipe, index) => (
                    <option key={index} value={recipe}>
                      {recipe}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealPlanner;
