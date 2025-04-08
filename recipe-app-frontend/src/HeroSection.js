import React from 'react';
import './HeroSection.css';
import HeroImage from "./Assets/HeroImage.png" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons'
import { faClock } from "@fortawesome/free-regular-svg-icons";



const HeroSection = ({ title = 'Recipes', subtitle = 'Discover trendy recipes', recipeTitle = 'Vegan: Beef and Lettuce Salad', time = '32 mins', badgeText = 'Popular' }) => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="hero-top-menu">
        <div className="hero-text">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="search-bar">
        <FontAwesomeIcon icon={faMagnifyingGlass} className='search-bar-icon'/>
        <input 
          type="search"
          placeholder="What do you want to cook today?"
          className="search-input"
        />
        </div>
        </div>
       

        <div className="hero-image-container">
          <div className="hero-overlay"></div>
          <img 
              src={HeroImage} 
              alt="Featured Recipe" 
              className="hero-image"
          />

          
          <div className="hero-badge">
            <span>{badgeText}</span>
          </div>

          <div className="recipe-details">
            <h2>{recipeTitle}</h2>
            <div className="recipe-meta">
              <div className="time-info">
              <FontAwesomeIcon icon={faClock} className="fa-icon" />
              <span>{time}</span>
              </div>
              <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/frame-10-2.png" alt="Rating" className="rating" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default HeroSection;

