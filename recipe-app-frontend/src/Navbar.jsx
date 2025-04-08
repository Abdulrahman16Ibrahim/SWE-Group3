import React from "react";
import logo from "./logo.png"
const Navbar = () => {
  return (
    <div className="navbar n-container">
        <a href="#!" className="logo">
          <p>NutriPlan</p>        </a>
        <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Recipes</a>
            <a href="#">My Recipes</a>
            <a href="#">Meal Plan</a>
            <a href="#">Shopping List</a>
        </div>
    </div>
  );
};

export default Navbar;
