import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';

const RecipeCard = ({ recipe }) => {
  const {
    recipe_id,
    recipe_name,
    cuisine_type,
    cooking_time,
    difficulty,
    rating
  } = recipe;

  const recipeThumb = recipe.meal_thumbnail || 'https://via.placeholder.com/150';
  const mealDescription = `${recipe_name} is a delicious ${cuisine_type} dish that takes about ${cooking_time} minutes to prepare. Difficulty: ${difficulty}.`;

  return (
    <Link to={`/recipes/${recipe_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card">
        <img
          src={recipeThumb}
          alt={recipe_name}
          className="card-image"
        />
        <div className="card-body">
          <span className="category">{cuisine_type}</span>
          <h3>{recipe_name}</h3>
          <p>{mealDescription}</p>
          <div className="card-footer">
            <div className="time">
              <FontAwesomeIcon icon={faClock} />                       
              <span>{cooking_time} mins</span>
            </div>
            <div className="rating">
              <FontAwesomeIcon icon={faStar} />
              <span>{rating}/5</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
