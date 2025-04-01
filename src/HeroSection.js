import React from 'react';
import './HeroSection.css';

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
        <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/iconamoo.png" alt="search" className="search-icon" />
        <input 
          type="text"
          placeholder="What do you want to cook today?"
          className="search-input"
        />
        </div>
        </div>
       

        <div className="hero-image-container">
          <div className="hero-overlay"></div>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/rectangl.png" 
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
                <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/mingcute.png" alt="Time" />
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

