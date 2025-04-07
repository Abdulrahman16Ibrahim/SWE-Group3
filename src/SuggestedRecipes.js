/*import React from 'react';
import './SuggestedRecipes.css';

const SuggestedRecipes = ({ searchQuery = 'Salad Dressing' }) => {
  return (
    <div className="suggested-recipes-container">
      <h2 className="suggested-title">Suggested Recipes for you</h2>
      <p className="search-text">Because you searched <span className="query">{searchQuery}</span></p>
    </div>
  );
};

export default SuggestedRecipes;*/
import React, { useState, useEffect } from 'react';
import './SuggestedRecipes.css';

const SuggestedRecipes = ({ searchQuery = '' }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = 'http://localhost:5000/api/recipes';
    // Only add query parameter if searchQuery is not empty.
    if (searchQuery) {
      url += `?cuisine=${encodeURIComponent(searchQuery)}`;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRecipes(data.data || []);
      })
      .catch(err => setError(err.message));
  }, [searchQuery]);

  return (
    <div className="suggested-recipes-container">
      <h2 className="suggested-title">Suggested Recipes for you</h2>
      {searchQuery && (
        <p className="search-text">
          Because you searched <span className="query">{searchQuery}</span>
        </p>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div>
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div key={recipe.recipe_id}>{recipe.name}</div>
          ))
        ) : (
          <div>No recipes available</div>
        )}
      </div>
    </div>
  );
  
};

export default SuggestedRecipes;

