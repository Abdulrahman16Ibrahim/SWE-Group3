import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import RecipeCard from './RecipeCard';
import './MyRecipes.css';

export default function MyRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  console.log('MyRecipes rendered, userId=', userId);



  useEffect(() => {
    console.log('Fetching saved recipes for', userId);
    fetch(`http://localhost:5000/api/favorites?userId=${userId}`)
      .then(res => res.json())
      .then(({ data }) => {
        console.log('savedRecipes data:', data);
        setSavedRecipes(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="my-recipes-page">
        <h2>My Saved Recipes</h2>
        {loading ? (
          <p>Loading…</p>
        ) : savedRecipes.length ? (
          <div className="recipes-grid">
            {savedRecipes.map(r => (
              <RecipeCard key={r.recipe_id} recipe={r} />
            ))}
          </div>
        ) : (
          <p>You haven’t saved any recipes yet.</p>
        )}
      </div>
    </>
  );
  }
    