// src/MealPlanning.jsx
import React, { useState, useEffect } from 'react';
import api from './api';
import Navbar from './Navbar';
import './MealPlan.css';

const daysOfWeek = [
  'Monday','Tuesday','Wednesday',
  'Thursday','Friday','Saturday','Sunday'
];

export default function MealPlanning() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes]       = useState([]);
  const [mealPlan, setMealPlan]     = useState({});
  const [loading, setLoading]       = useState(false);
  const [saving, setSaving]         = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await api.get('/recipes');
        setRecipes(resp.data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const terms = ingredients
      .split(',')
      .map(s=>s.trim().toLowerCase())
      .filter(Boolean);
    if (!terms.length) return alert('Enter at least one ingredient.');

    const matches = recipes.filter(r => {
      const text = Array.isArray(r.ingredients)
        ? r.ingredients.join(' ').toLowerCase()
        : String(r.ingredients).toLowerCase();
      return terms.some(t=> text.includes(t));
    });
    if (!matches.length) {
      alert('No recipes match those ingredients.');
      setMealPlan({});
      return;
    }

    const plan = {};
    for (let i=0; i<daysOfWeek.length; i++) {
      plan[daysOfWeek[i]] = matches[i % matches.length];
    }
    setMealPlan(plan);
  };

  const savePlan = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return alert('You must be logged in to save.');
    setSaving(true);
    try {
      await api.post('/mealplans', { userId, mealPlan });
      alert('Meal plan saved!');
    } catch (err) {
      console.error(err);
      alert('Save failed.');
    }
    setSaving(false);
  };

  return (
    <>
      <Navbar/>
      <div className="meal-planning">
        <h1>Create Your Meal Plan</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="3"
            placeholder="Enter ingredients (e.g. flour, egg)"
            value={ingredients}
            onChange={e=>setIngredients(e.target.value)}
          />
          <button type="submit" disabled={loading||!ingredients.trim()}>
            {loading ? 'Generating…' : 'Generate Meal Plan'}
          </button>
        </form>

        {Object.keys(mealPlan).length > 0 && (
          <>
            <h2>Weekly Meal Plan</h2>
            <ul>
              {daysOfWeek.map(day => {
                const r = mealPlan[day];
                return (
                  <li key={day}>
                    <strong>{day}:</strong>{' '}
                    {r ? (r.title||r.recipe_name) : 'No match'}
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={savePlan}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save Meal Plan'}
            </button>
          </>
        )}
      </div>
    </>
  );
}
