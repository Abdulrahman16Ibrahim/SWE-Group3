import React from "react";
import logo from "./logo.png"
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar n-container">
        <a href="#!" className="logo">
          <p>NutriPlan</p>        </a>
        <div className="nav-links">
            <a href="#">Home</a>
            <Link to="/recipes">Recipes</Link>
            <a href="#">My Recipes</a>
            <a href="#">Meal Plan</a>
            <a href="#">Shopping List</a>
        </div>
    </div>
  );
};

export default Navbar;
