import React from 'react';
import './SuggestedRecipes.css';

const SuggestedRecipes = ({ searchQuery = 'Salad Dressing' }) => {
  return (
    <div className="suggested-recipes-container">
      <h2 className="suggested-title">Suggested Recipes for you</h2>
      <p className="search-text">Because you searched <span className="query">{searchQuery}</span></p>
    </div>
  );
};

export default SuggestedRecipes;
