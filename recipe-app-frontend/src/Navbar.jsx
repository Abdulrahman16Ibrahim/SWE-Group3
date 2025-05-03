// src/Navbar.jsx
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from './logo.png';
import './App.css';  // your existing global stylesheet

export default function Navbar() {
  const history = useHistory();
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    history.push('/login');
  };

  return (
    <div className="navbar n-container">
      <NavLink exact to="/" className="logo">
        <p>NutriPlan</p>
      </NavLink>

      <div className="nav-links">
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/recipes" activeClassName="active">Recipes</NavLink>
        <NavLink to="/myRecipes" activeClassName="active">My Recipes</NavLink>
        <NavLink to="/mealplan" activeClassName="active">Meal Plan</NavLink>
        <NavLink to="/shoppinglist" activeClassName="active">Shopping List</NavLink>
      </div>

      {userId && (
        <button 
          onClick={handleLogout} 
          className="logout-btn" 
          aria-label="Log Out"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Log Out</span>
        </button>
      )}
    </div>
  );
}
