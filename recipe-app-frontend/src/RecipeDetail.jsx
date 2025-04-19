import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetail.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faUtensils, faChartSimple, faListOl,faFire} from '@fortawesome/free-solid-svg-icons';
import { faStar as fullStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";


import Navbar from "./Navbar";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

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
        <img className="recipe-image"
          src={recipe.meal_thumbnail || "https://images.unsplash.com/photo-1675774648629-e1f0dbc152fe?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D50"}
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
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

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
              
         <p><strong>Nutritional Information:</strong> {recipe.nutritional_info}</p>
        </div>
        /</div>
     

       
      </div>
    </div>
  );
};

export default RecipeDetail;
