import React from "react";
import signin_img from "../assets/signin_img.png";

const Signup = () => {
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
                <input type="text" id="firstname" placeholder="First name" />
              </div>
              <div className="input-group">
                <input type="text" id="lastname" placeholder="Last name" />
              </div>
            </div>
            <div className="signup-password">
              <div className="input-group">
                <input type="password" id="password" placeholder="Password" />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  id="repassword"
                  placeholder="Repeat Password"
                />
              </div>
            </div>
            {/* <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password">Forgot Password?</a>
            </div> */}
            <button type="submit" className="btn-login">
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
