import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import "./SignUp.css";
import SignupImage from "./Assets/SignupImage.png";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const history = useHistory();

  const isMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!isMinLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      alert("Please ensure your password meets all the requirements.");
      return;
    }

    const userData = {
      email,
      password,
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1] || "",
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      console.log("BACKEND RESPONSE:", response.data);

      const userId = response.data.user_id;
      console.log("Saving to localStorage → user_id:", userId);
      localStorage.setItem("user_id", userId);
      localStorage.setItem("userName", userData.firstName); 
      console.log("Saved:", localStorage.getItem("user_id"));

      alert('Account created successfully!');
      history.push("/preferences");

    } catch (error) {
      console.error("Error registering user:", error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="left-panel">
        <img src={SignupImage} alt="Sign Up" />
      </div>
      <div className="right-panel">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="Password">Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              id="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="toggle-password"
              onClick={() => setShowPassword(prev => !prev)}
            />
          </div>

          <div className="password-requirements">
            <ul>
              <li className={isMinLength ? 'valid' : ''}>Password must be at least 8 characters long.</li>
              <li className={hasUppercase ? 'valid' : ''}>Must include at least one uppercase letter.</li>
              <li className={hasLowercase ? 'valid' : ''}>Must include at least one lowercase letter.</li>
              <li className={hasNumber ? 'valid' : ''}>Must include at least one number.</li>
              <li className={hasSpecialChar ? 'valid' : ''}>Must include at least one special character.</li>
            </ul>
          </div>

          <label htmlFor="Confirm Password">Confirm Password</label>
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="Confirm Password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="toggle-password"
              onClick={() => setShowConfirmPassword(prev => !prev)}
            />
          </div>

          <button type="submit">Create Account</button>

          <p className="agreement">
            By signing up, you agree to our <a href="#!">Terms of Service</a> and <a href="#!">Privacy Policy</a>
          </p>
          <p className="nav-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
