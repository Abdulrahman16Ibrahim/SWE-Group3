// src/MyRecipes.jsx
import React, { useState, useEffect } from 'react';
import './MyRecipes.css';   
import Navbar from './Navbar';
import RecipeCard from './RecipeCard';

export default function MyRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  // use the same key you wrote on signup/login
  const userId = parseInt(localStorage.getItem('user_id'), 10);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetch(`http://localhost:5000/api/favorites?userId=${userId}`)
      .then(res => res.json())
      .then(({ data }) => setSavedRecipes(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  const handleUnsave = async (recipeId) => {
    try {
      const res = await fetch('http://localhost:5000/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, recipeId })
      });
      if (res.ok) {
        setSavedRecipes(recipes =>
          recipes.filter(r => r.recipe_id !== recipeId)
        );
      } else {
        console.error('Failed to remove recipe');
      }
    } catch (err) {
      console.error(err);
    }
  };

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
              <div key={r.recipe_id} className="saved-recipe-item">
                <RecipeCard recipe={r} />
                <button
                  className="unsave-btn"
                  onClick={() => handleUnsave(r.recipe_id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven’t saved any recipes yet.</p>
        )}
      </div>
    </>
  );
}
