import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetail.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faUtensils, faChartSimple, faListOl, faFire } from '@fortawesome/free-solid-svg-icons';
import { faStar as fullStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import Navbar from "./Navbar";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [servings, setServings] = useState(1); // ✅ moved here

  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }
        return response.json();
      })
      .then(data => {
        setRecipe(data.data);
        console.log(data.data);
      })
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>Loading...</p>;

  let instructionsArray = [];
  if (Array.isArray(recipe.instructions)) {
    instructionsArray = recipe.instructions;
  } else if (typeof recipe.instructions === "string") {
    instructionsArray = recipe.instructions.split(/\r?\n/).filter(step => step.trim() !== "");
  }

  let ingredientsArray = [];
  if (Array.isArray(recipe.ingredients)) {
    ingredientsArray = recipe.ingredients;
  } else if (typeof recipe.ingredients === "string") {
    ingredientsArray = recipe.ingredients.split(/\r?\n/).filter(item => item.trim() !== "");
  }

  const increaseServings = () => setServings(prev => prev + 1);
  const decreaseServings = () => setServings(prev => (prev > 1 ? prev - 1 : 1));

  const scaleIngredient = (ingredient) => {
    const match = ingredient.match(/^(\d+(?:\/\d+)?|\d+(?:\.\d+)?)([a-zA-Z\s]*)?(.*)/);
    if (match) {
      let quantity = parseFloat(eval(match[1]));
      if (isNaN(quantity)) return ingredient;

      const unitAndRest = match[2]?.trim() + " " + match[3]?.trim();
      const newQty = (quantity * servings).toFixed(quantity % 1 === 0 ? 0 : 2);
      return `${newQty} ${unitAndRest.trim()}`;
    }
    return ingredient;
  };

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < full; i++) {
      stars.push(<FontAwesomeIcon icon={fullStar} key={`full-${i}`} />);
    }

    if (hasHalf) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key="half" />);
    }

    while (stars.length < 5) {
      stars.push(<FontAwesomeIcon icon={emptyStar} key={`empty-${stars.length}`} />);
    }

    return stars;
  };

  const mealDescription = `${recipe.recipe_name} is a delicious ${recipe.cuisine_type} dish that takes about ${recipe.cooking_time} minutes to prepare. 
  Fluffy rice paired with succulent chicken stew, slow-cooked in a rich, flavorful tomato base, and topped with perfectly boiled eggs for a hearty and satisfying meal.`;

  return (
    <div className="recipe-detail">
      <Navbar />
      <div className="page-wrapper">
        <div className="recipe-detail-header">
          <div className="recipe-detail-header-content">
            <div className="back-text">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="section-title">Back to Recipes</span>
            </div>
            <h2>Recipe Details</h2>
          </div>
          <button className="save-recipe-btn">Save Recipe</button>
        </div>

        <div className="content-container">
          <div className="left-column">
            <img
              className="recipe-image"
              src={`/${recipe.recipe_thumb}`}
              alt={recipe.recipe_name}
            />
            <div className="recipe-summary">
              <div className="summary-item">
                <div className="icon-box">
                  <FontAwesomeIcon icon={faUtensils} />
                </div>
                <div>
                  <p className="summary-label">Prep time</p>
                  <p className="summary-value">10 mins</p>
                </div>
              </div>

              <div className="summary-item">
                <div className="icon-box">
                  <FontAwesomeIcon icon={faFire} />
                </div>
                <div>
                  <p className="summary-label">Cook time</p>
                  <p className="summary-value">{recipe.cooking_time} mins</p>
                </div>
              </div>

              <div className="summary-item">
                <div className="icon-box">
                  <FontAwesomeIcon icon={faChartSimple} />
                </div>
                <div>
                  <p className="summary-label">Difficulty</p>
                  <p className="summary-value">{recipe.difficulty}</p>
                </div>
              </div>

              <div className="summary-item">
                <div className="icon-box">
                  <FontAwesomeIcon icon={faListOl} />
                </div>
                <div>
                  <p className="summary-label">Total Steps</p>
                  <p className="summary-value">{instructionsArray.length} Steps</p>
                </div>
              </div>

              <div className="recipe-reviews">
                <div className="recipe-header">
                  <h2>Reviews</h2>
                  <button className="rate-button">Rate Recipe</button>
                </div>

                <div className="review">
                  <p className="review-text">"Very easy to make and the portion was just right. I added a little garlic to the brown rice for extra flavor"</p>
                  <div className="review-meta">
                    <div className="review-avatar">J</div>
                    <div>
                      <p className="review-name">Jane Doe</p>
                      <div className="review-rating">
                        <span>{recipe.rating}/5</span>
                        {renderStars(recipe.rating)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review">
                  <p className="review-text">"Very easy to make and the portion was just right. I added a little garlic to the brown rice for extra flavor"</p>
                  <div className="review-meta">
                    <div className="review-avatar">J</div>
                    <div>
                      <p className="review-name">Jane Doe</p>
                      <div className="review-rating">
                        <span>{recipe.rating}/5</span>
                        {renderStars(recipe.rating)}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="middle-column">
            <h3>{recipe.recipe_name}</h3>
            <p className="recipe-description">{mealDescription}</p>

            <h3>Directions</h3>
            {instructionsArray.length > 0 ? (
              <ol>
                {instructionsArray.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            ) : (
              <p>No instructions provided.</p>
            )}
          </div>

          <div className="right-column">
            <div className="ingredients-box">
              <div className="ingredients-header">
                <h3>Total Servings</h3>
                <div className="servings-controls">
                  <button className="servings-btn" onClick={decreaseServings}>−</button>
                  <span className="servings-count">{servings}</span>
                  <button className="servings-btn" onClick={increaseServings}>+</button>
                </div>
              </div>

              <h3>Ingredients</h3>
              <ul className="ingredients-list">
                {ingredientsArray.length > 0 ? (
                  ingredientsArray.map((ingredient, index) => (
                    <li key={index}>
                      <span className="ingredient-number">{index + 1}</span>
                      <span className="ingredient-text">{scaleIngredient(ingredient)}</span>
                    </li>
                  ))
                ) : (
                  <p>No ingredients listed.</p>
                )}
              </ul>
            </div>

            <div className="nutrition-facts">
              <div className="nutrition-header">
                <h4>Nutrition Facts</h4>
                <span>Per Serving</span>
              </div>
              <div className="nutrition-table">
                {recipe.nutritional_info &&
                  recipe.nutritional_info
                    .split(/\r?\n/)
                    .filter(line => line.trim() !== "")
                    .map((line, index) => {
                      const [label, value] = line.split(":");
                      return (
                        <div className="nutrition-row" key={index}>
                          <span>{label?.trim()}</span>
                          <span>{value?.trim()}</span>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
