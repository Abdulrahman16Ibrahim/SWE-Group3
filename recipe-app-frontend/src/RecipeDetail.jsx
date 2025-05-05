// src/RecipeDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./RecipeDetail.css";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUtensils,
  faChartSimple,
  faListOl,
  faFire,
  faStarHalfAlt,
  faStar as fullStar
} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

export default function RecipeDetail() {
  const { id } = useParams();
  const history = useHistory();
  const userId = parseInt(localStorage.getItem("user_id"), 10);

  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [servings, setServings] = useState(1);
  const [saved, setSaved] = useState(false);

  // Fetch recipe details
  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch recipe details");
        return res.json();
      })
      .then(data => setRecipe(data.data))
      .catch(err => setError(err.message));
  }, [id]);

  // Check if already saved
  useEffect(() => {
    if (!recipe || !userId) return;
    fetch(`http://localhost:5000/api/favorites?userId=${userId}`)
      .then(r => r.json())
      .then(({ data }) => {
        if (data.find(r => r.recipe_id === recipe.recipe_id)) {
          setSaved(true);
        }
      })
      .catch(console.error);
  }, [recipe, userId]);

  // Save handler
  const handleSave = async () => {
    if (!userId) return alert("You must be logged in to save.");
    try {
      const res = await fetch("http://localhost:5000/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, recipeId: recipe.recipe_id })
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      
    } catch (err) {
      console.error("Error saving recipe:", err);
      alert("Could not save recipe.");
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>Loading...</p>;

  // Prepare instructions array
  let instructionsArray = [];
  if (Array.isArray(recipe.instructions)) {
    instructionsArray = recipe.instructions;
  } else if (typeof recipe.instructions === "string") {
    instructionsArray = recipe.instructions
      .split(/\r?\n/)
      .filter(step => step.trim());
  }

  // Prepare ingredients array
  let ingredientsArray = [];
  if (Array.isArray(recipe.ingredients)) {
    ingredientsArray = recipe.ingredients;
  } else if (typeof recipe.ingredients === "string") {
    ingredientsArray = recipe.ingredients
      .split(/\r?\n/)
      .filter(item => item.trim());
  }

  // Servings controls
  const increaseServings = () => setServings(s => s + 1);
  const decreaseServings = () => setServings(s => (s > 1 ? s - 1 : 1));

  // Scale ingredient amounts
  const scaleIngredient = ingredient => {
    const match = ingredient.match(
      /^(\d+(?:\/\d+)?|\d+(?:\.\d+)?)([a-zA-Z\s]*)?(.*)/
    );
    if (match) {
      let quantity = parseFloat(eval(match[1]));
      if (isNaN(quantity)) return ingredient;
      const rest = (match[2]?.trim() + " " + match[3]?.trim()).trim();
      const newQty = (quantity * servings).toFixed(
        quantity % 1 === 0 ? 0 : 2
      );
      return `${newQty} ${rest}`;
    }
    return ingredient;
  };

  // Render star rating
  const renderStars = rating => {
    const stars = [];
    const fullCount = Math.floor(rating);
    const half = rating % 1 !== 0;
    for (let i = 0; i < fullCount; i++) {
      stars.push(<FontAwesomeIcon icon={fullStar} key={`full-${i}`} />);
    }
    if (half) {
      stars.push(
        <FontAwesomeIcon icon={faStarHalfAlt} key="half-star" />
      );
    }
    while (stars.length < 5) {
      stars.push(
        <FontAwesomeIcon icon={emptyStar} key={`empty-${stars.length}`} />
      );
    }
    return stars;
  };

  const mealDescription = `${recipe.recipe_name} is a delicious ${recipe.cuisine_type} dish that takes about ${recipe.cooking_time} minutes to prepare.`;

  return (
    <div className="recipe-detail">
      <Navbar />
      <div className="page-wrapper">
        <div className="recipe-detail-header">
          <div className="recipe-detail-header-content">
            <div
              className="back-text"
              onClick={() => history.goBack()}
              style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="section-title" style={{ marginLeft: "8px" }}>
                Back to Recipes
              </span>
            </div>
            <h2>{recipe.recipe_name}</h2>
          </div>
          <button
            className="save-recipe-btn"
            onClick={handleSave}
            disabled={saved}
          >
            {saved ? "Saved" : "Save Recipe"}
          </button>
        </div>

        <div className="content-container">
          <div className="left-column">
            <img
              className="recipe-image"
              src={recipe.recipe_thumb}
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
                  <p className="summary-value">
                    {recipe.cooking_time} mins
                  </p>
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
                  <p className="summary-label">Steps</p>
                  <p className="summary-value">
                    {instructionsArray.length} steps
                  </p>
                </div>
              </div>
            </div>

            <div className="recipe-reviews">
              <div className="recipe-header">
                <h3>Reviews</h3>
              </div>
              <div className="review">
                <p className="review-text">
                  "Very easy to make and the portion was just right."
                </p>
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

          <div className="middle-column">
            <p className="recipe-description">{mealDescription}</p>
            <h3>Directions</h3>
            {instructionsArray.length ? (
              <ol>
                {instructionsArray.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            ) : (
              <p>No instructions provided.</p>
            )}
          </div>

          <div className="right-column">
            <div className="ingredients-box">
              <div className="ingredients-header">
                <h3>Servings</h3>
                <div className="servings-controls">
                  <button className="servings-btn" onClick={decreaseServings}>−</button>
                  <span className="servings-count">{servings}</span>
                  <button className="servings-btn" onClick={increaseServings}>+</button>
                </div>
              </div>

              <h3>Ingredients</h3>
              <ul className="ingredients-list">
                {ingredientsArray.length ? (
                  ingredientsArray.map((ing, idx) => (
                    <li key={idx}>
                      <span className="ingredient-number">{idx + 1}.</span>
                      <span className="ingredient-text">{scaleIngredient(ing)}</span>
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
                    .filter(l => l.trim())
                    .map((line, idx) => {
                      const [label, value] = line.split(":");
                      return (
                        <div className="nutrition-row" key={idx}>
                          <span>{label.trim()}</span>
                          <span>{value.trim()}</span>
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
}
