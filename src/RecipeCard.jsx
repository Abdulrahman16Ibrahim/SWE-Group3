import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons'

const RecipeCard = ({recipe}) => {
    const{idMeal, strMeal, strCategory, strMealThumb, strDescription, strCookTime, strRating} = recipe;
    
    // Default description
    const mealDescription = `${strMeal} is a delicious dish that combines a variety of fresh ingredients, carefully prepared to create a flavorful meal.`;


    return (
        <div className="card">
            <img
                src={strMealThumb}
                alt={strMeal}
                className="card-image"
            />
            <div className="card-body">
                <span className="category">{strCategory}</span>
                <h3>{strMeal}</h3>
                <p>{mealDescription}</p>
                <div className="card-footer">
                    <div className="time">
                    <FontAwesomeIcon icon={faClock} />                       
                    <span>30 mins</span>
                    </div>
                    <div className="rating">
                    <FontAwesomeIcon icon={faStar} />
                    <span>4/5</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard;