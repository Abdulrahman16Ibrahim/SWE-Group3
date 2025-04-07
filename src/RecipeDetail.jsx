import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  // Process instructions: if it's an array, use it directly; if it's a string, split by newline.
  let instructionsArray = [];
  if (Array.isArray(recipe.instructions)) {
    instructionsArray = recipe.instructions;
  } else if (typeof recipe.instructions === "string") {
    instructionsArray = recipe.instructions.split(/\r?\n/).filter(step => step.trim() !== "");
  }

  return (
    <div className="recipe-detail">
      <h2>{recipe.recipe_name}</h2>
      <img
        src={recipe.meal_thumbnail || "https://via.placeholder.com/150"}
        alt={recipe.recipe_name}
      />
      <p><strong>Cuisine:</strong> {recipe.cuisine_type}</p>
      <p><strong>Cooking Time:</strong> {recipe.cooking_time} mins</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Preparation Steps:</h3>
      {instructionsArray.length > 0 ? (
        <ol>
          {instructionsArray.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      ) : (
        <p>No instructions provided.</p>
      )}
      <p><strong>Nutritional Information:</strong> {recipe.nutritional_info}</p>
    </div>
  );
};

export default RecipeDetail;
