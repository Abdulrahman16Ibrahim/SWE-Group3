import React, { useState } from 'react';
import api from './api';
import Navbar from './Navbar';
import './MealPlanner.css';

const daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function shuffle(a){ const arr=[...a]; for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];} return arr; }

export default function MealPlanner() {
  const [ingredients, setIngredients] = useState('');
  const [dietaryRestriction, setDietaryRestriction] = useState('');
  const [mealPlan, setMealPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const terms = ingredients.split(',').map(t=>t.trim().toLowerCase()).filter(Boolean);
    if (!terms.length) return alert('Enter at least one ingredient.');
    setLoading(true);
    try {
      const resp = await api.get('/recipes');
      let matches = resp.data.data.filter(r=>{
        const text = Array.isArray(r.ingredients)? r.ingredients.join(' ').toLowerCase() : String(r.ingredients).toLowerCase();
        return terms.some(term=>text.includes(term));
      });
      if (dietaryRestriction) matches = matches.filter(r=>r.dietary===dietaryRestriction);
      matches = shuffle(matches);
      if (matches.length<7) {
        const others = shuffle(resp.data.data.filter(r=>!matches.includes(r)));
        matches = matches.concat(others.slice(0,7-matches.length));
      }
      const plan={};
      daysOfWeek.forEach((d,i)=>plan[d]=matches[i]||null);
      setMealPlan(plan);
    } catch {
      alert('Could not generate meal plan.');
    }
    setLoading(false);
  };

  const savePlan = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return alert('Log in to save.');
    setSaving(true);
    try {
      await api.post('/mealplans',{ userId, mealPlan });
      alert('Meal plan saved!');
    } catch {
      alert('Save failed.');
    }
    setSaving(false);
  };

  return (
    <>
      <Navbar/>
      <div className="meal-planning-wrapper">
        <div className="meal-planner-container">
          <h1 className="title">Meal Planner</h1>
          <form onSubmit={handleSubmit}>
            <textarea rows="3" placeholder="flour, egg" value={ingredients} onChange={e=>setIngredients(e.target.value)}/>
            <select value={dietaryRestriction} onChange={e=>setDietaryRestriction(e.target.value)}>
              <option value="">No restriction</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Gluten-Free">Gluten‑Free</option>
            </select>
            <button type="submit" disabled={loading||!ingredients.trim()}>{loading?'…':'Generate Meal Plan'}</button>
          </form>
          {Object.keys(mealPlan).length>0 && <>
            <h2>Weekly Meal Plan</h2>
            <ul className="plan-summary">
              {daysOfWeek.map(d=>{
                const r=mealPlan[d];
                return <li key={d}><strong>{d}:</strong> {r?.title||r?.recipe_name||'No match'}</li>;
              })}
            </ul>
            <button onClick={savePlan} disabled={saving}>{saving?'Saving…':'Save Meal Plan'}</button>
          </>}
        </div>
      </div>
    </>
  );
}
