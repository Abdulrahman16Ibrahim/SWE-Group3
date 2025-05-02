import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProfileOverview.css";

const ProfileOverview = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-overview-container">
      <h1>My Profile</h1>
      {user ? (
        <div className="profile-card">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Profile" 
            className="profile-picture"
          />
          <div className="profile-details">
            <h2>{user.firstName} {user.lastName}</h2>
            <p><strong>Email:</strong> {user.email}</p>

            <Link to="/edit-profile">
              <button className="edit-button">Edit Profile ✏️</button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfileOverview;
