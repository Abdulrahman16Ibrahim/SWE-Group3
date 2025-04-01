import React, { useState } from 'react';


const Categories = ({ defaultCategory = 'All' }) => {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Soup', 'Vegan'];

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h2 className="categories-title">Categories</h2>
        <span className="see-all">See all</span>
      </div>
      
      <div className="categories-toggle">
        {categories.map((category) => (
          <button
            key={category}
            className={`toggle-item ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;

