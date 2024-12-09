import React, { useState } from "react";
import signin_img from "../assets/signin_img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleSignIn, handleSignUp } from "../utils";

const Signup = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "password": password
    }
    await handleSignUp(user);
    navigate('/signin');
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup">
          <div className="signup-header">
            <h1>
              AUDIO <span>TRACKING</span>
            </h1>
            <p>Signup Now</p>
          </div>
          <form className="signup-form">
            <div className="signup-name">
              <div className="input-group">
                <input type="text" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
              </div>
              <div className="input-group">
                <input type="text" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
              </div>
            </div>
            <div className="input-group">
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="input-group">
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            {/* <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password">Forgot Password?</a>
            </div> */}
            <button type="submit" className="btn-login" onClick={handleSubmit}>
              Sign Up
            </button>
          </form>

          {/* <div className="divider">
            <span>or continue with</span>
          </div>
          <div className="social-login">
            <button className="google-login">Google Account</button>
            <button className="apple-login">Apple Account</button>
          </div> */}
        </div>

        <div className="signin-up">
          <p>
            You already have an account? <a href="/signin">Sign In</a>
          </p>
        </div>
      </div>
      <div className="signin-img">
        <img src={signin_img} />
      </div>
    </div>
  );
};

export default Signup;
