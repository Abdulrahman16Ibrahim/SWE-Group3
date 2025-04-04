import React from "react";
import "./SignUp.css";
import SignupImage from "./Assets/SignupImage.png";

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="left-panel">
        <img src={SignupImage} alt="Signup" />
      </div>
      <div className="right-panel">
        <h2>Create Account</h2>
        <form action="">
            <label htmlFor="Name">Name</label>
          <input type="text" id="Name" placeholder="Enter your name" required />
          <label htmlFor="Email">Email</label>
          <input type="email" id="Email" placeholder="Enter your Email" required />
          <label htmlFor="Password">Password</label>
          <input type="password" id="Password" placeholder="Enter your password" />
          <div className="password-requirements">
            <ul>
              <li>Password must be at least 8 characters long.</li>
              <li>Must include at least one uppercase letter.</li>
              <li>Must include at least one lowercase letter.</li>
              <li>Must include at least one number.</li>
              <li>Must include at least one special character (e.g., !@#$%).</li>
              <li>Avoid using easily guessable words or sequences like '123456' or 'password.'</li>
            </ul>
          </div>
          <label htmlFor="Confirm Password">Confirm Password</label>
          <input type="password" id="Confirm Password" placeholder="Confirm password" />
          <button type="submit">Create Account</button>
          <p className="agreement">
            By signing up, you agree to our{" "}
            <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
