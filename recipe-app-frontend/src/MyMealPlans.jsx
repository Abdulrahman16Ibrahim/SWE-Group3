import React, { useState, useEffect } from 'react';
import api from './api';
import Navbar from './Navbar';
import './MealPlanner.css';

export default function MyMealPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('user_id');

  useEffect(()=>{
    (async()=>{
      if (!userId) return setLoading(false);
      try{
        const resp = await api.get(`/mealplans?userId=${userId}`);
        setPlans(resp.data.data);
      }catch{
        alert('Could not load plans');
      }
      setLoading(false);
    })();
  },[userId]);

  return <>
    <Navbar/>
    <div className="meal-planning-wrapper">
      <div className="meal-planner-container">
        <h1>Your Saved Meal Plans</h1>
        {loading && <p>Loading…</p>}
        {!loading && plans.length===0 && <p>No saved plans yet.</p>}
        {!loading && plans.map((p,i)=>
          <div key={p.id} style={{margin:'1rem 0'}}>
            <h2>Plan #{i+1}</h2>
            <ul className="plan-summary">
              {Object.entries(p.plan).map(([d,r])=>
                <li key={d}><strong>{d}:</strong> {r?.title||r?.recipe_name||'—'}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  </>;
}
