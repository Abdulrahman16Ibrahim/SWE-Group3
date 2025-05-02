import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import "./LogIn.css";
import SignupImage from "./Assets/SignupImage.png";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });

      const userId = response.data.user.userId;
      localStorage.setItem("userId", userId);

      setMessage("Login successful!");
      history.push("/recipes");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <img src={SignupImage} alt="Login" />
      </div>
      <div className="right-panel">
        <h2>Sign In</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
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

          <button type="submit">Sign In</button>

          <p className="nav-link">
            Don't have an account? <Link to="/">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
