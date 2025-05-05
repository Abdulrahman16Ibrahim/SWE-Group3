// src/Navbar.jsx
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from './logo.png';
import './App.css';

export default function Navbar() {
  const history = useHistory();
  // ← changed to match your SignUp key
  const userId = localStorage.getItem('user_id');

  const handleLogout = () => {
    // ← clear the same key
    localStorage.removeItem('user_id');
    localStorage.removeItem('userName'); // also clear the name if you want
    history.push('/login');
  };

  return (
    <div className="navbar n-container">
      <NavLink exact to="/" className="logo">
        <p>NutriPlan</p>
      </NavLink>

      <div className="nav-links">
        {/*<NavLink exact to="" activeClassName="active">Home</NavLink>*/}
        <NavLink to="/recipes" activeClassName="active">Recipes</NavLink>
        <NavLink to="/myRecipes" activeClassName="active">My Recipes</NavLink>
        <NavLink to="/mealplan" activeClassName="active">Meal Plan</NavLink>
        <NavLink to="/my-plans"   activeClassName="active">My Plans</NavLink>
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
