import React from 'react';


const SideMenu = () => {
  return (
    <div className="side-menu">
      <div className="logo">
        <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/black-an.png" alt="Logo" />
      </div>

      <div className="menu-items">
        <div className="menu-item">
          <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/dashboar.png" alt="Dashboard" />
          <span>Dashboard</span>
        </div>
        
        <div className="menu-item active">
          <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/iconoir.png" alt="Search" />
          <span>Discover Recipes</span>
        </div>

        <div className="menu-item">
          <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/garden-c.png" alt="My Recipes" />
          <span>My Recipes</span>
        </div>

        <div className="menu-item">
          <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/garden-c-2.png" alt="Meal Plan" />
          <span>Meal Plan</span>
        </div>

        <div className="menu-item">
          <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/mdi-shop.png" alt="Shopping List" />
          <span>Shopping List</span>
        </div>
      </div>

      <div className="bottom-menu">
        <div className="menu-item">
          <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/codicon.png" alt="Account" />
          <span>My Account</span>
        </div>

        <div className="menu-item">
          <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/material.png" alt="Help" />
          <span>Help and Support</span>
        </div>

        <div className="menu-item sign-out">
          <img src="https://dashboard.codeparrot.ai/api/image/Z-rfPHn5m-GBkPNG/sign-out.png" alt="Sign Out" />
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

