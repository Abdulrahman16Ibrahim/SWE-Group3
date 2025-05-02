import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./UserPreferencesForm.css";

const options = {
  diet: ["Vegan", "Vegetarian", "Gluten Free", "Dairy Free", "Nut Free", "Low Carb", "High-Protein", "Other", "None"],
  allergies: ["Nuts", "Dairy", "Wheat", "Eggs", "Shell Fish", "Other"],
  skill: ["Beginner", "Intermediate", "Expert"],
  cookFrequency: ["Daily", "Weekly", "As needed"],
  mealTypes: ["Quick and Easy", "Healthy and Light", "Comfort Food", "Family friendly"]
};

const UserPreferencesForm = () => {
  const [formData, setFormData] = useState({
    diet: [],
    allergies: [],
    skill: "",
    cookFrequency: "",
    mealTypes: []
  });

  const history = useHistory();

  const toggleMulti = (field, value) => {
    setFormData(prev => {
      const list = prev[field];
      return {
        ...prev,
        [field]: list.includes(value)
          ? list.filter(item => item !== value)
          : [...list, value]
      };
    });
  };

  const selectSingle = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle submit triggered");
    const userId = parseInt(localStorage.getItem("user_id")); 

    if (!userId) {
      alert("User ID not found. Please sign up or log in again.");
      return;
    }

    const formattedData = {
      user_id: userId,
      dietaryPreferences: formData.diet.join(","),
      allergies: formData.allergies.join(","),
      skillLevel: formData.skill,
      cookFrequency: formData.cookFrequency,
      mealTypes: formData.mealTypes.join(",")
    };

    console.log("Submitting preferences for userId:", userId); // ✅ Debug log

    try {
      await axios.put("http://localhost:5000/api/users/preferences", formattedData);
      alert("Preferences saved!");
      history.push("/recipes");
    } catch (error) {
      console.error("Error saving preferences:", error.response?.data || error.message);
      alert("Failed to save preferences.");
    }
  };
  console.log("Preferences form rendered");

  return (
    <form className="preferences-form" onSubmit={handleSubmit}>
      <h2>Personalize Your Experience</h2>
      <p className="subtext">We’ll recommend recipes based on your preferences.</p>

      <section>
        <h3>Dietary Preferences</h3>
        <p>Select all that apply</p>
        <div className="button-grid">
          {options.diet.map(option => (
            <button
              type="button"
              key={option}
              className={formData.diet.includes(option) ? "active" : ""}
              onClick={() => toggleMulti("diet", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3>Allergies</h3>
        <p>Select all that apply</p>
        <div className="button-grid">
          {options.allergies.map(option => (
            <button
              type="button"
              key={option}
              className={formData.allergies.includes(option) ? "active" : ""}
              onClick={() => toggleMulti("allergies", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3>Skill Level</h3>
        <p>Select one</p>
        <div className="button-grid">
          {options.skill.map(option => (
            <button
              type="button"
              key={option}
              className={formData.skill === option ? "active" : ""}
              onClick={() => selectSingle("skill", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3>How often do you cook?</h3>
        <p>Select one</p>
        <div className="button-grid">
          {options.cookFrequency.map(option => (
            <button
              type="button"
              key={option}
              className={formData.cookFrequency === option ? "active" : ""}
              onClick={() => selectSingle("cookFrequency", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3>What kind of meals are you looking for?</h3>
        <p>Select all that apply</p>
        <div className="button-grid">
          {options.mealTypes.map(option => (
            <button
              type="button"
              key={option}
              className={formData.mealTypes.includes(option) ? "active" : ""}
              onClick={() => toggleMulti("mealTypes", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <button type="submit" className="submit-btn">Save Preferences</button>
    </form>
  );
};

export default UserPreferencesForm;
