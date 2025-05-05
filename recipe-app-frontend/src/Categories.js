// Categories.js
import React from 'react';

const Categories = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    'All',
    'Italian',
    'French',
    'Breakfast',
    'Mexican',
    'Mediterranean',
    'American',
    'Indian',
    'Thai'
  ];
  return (
    <div className="categories-container">
      <div className="categories-header">
        <h2 className="categories-title">Categories</h2>
        <span className="see-all">See all</span>
      </div>
      <div className="categories-toggle">
        {categories.map(category => (
          <button
            key={category}
            className={`toggle-item ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
