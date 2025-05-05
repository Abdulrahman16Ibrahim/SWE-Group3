// src/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">

    
    <div className="not-found-container">
    <img
          src="/not-found.jpg"
          alt="Page not found"
          className="not-found-image"
        />
      
      <p>Oops — the page you’re looking for doesn’t exist.</p>
      <Link to="/recipes" className="home-link">Go back home</Link>
    </div>
    </div>
  );
}
