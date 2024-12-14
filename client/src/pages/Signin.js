import { useEffect, useState } from "react";
import signin_img from "../assets/signin_img.png";
import { useNavigate } from "react-router-dom";
import { handleSignIn } from "../utils";

export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    localStorage.clear();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      "email": email,
      "password": password
    }
    await handleSignIn(user);
  }
  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="signin">
          <div className="signin-header">
            <h1>
              AUDIO <span>TRACKING</span>
            </h1>
            <p>Log in to Audio Tracking Platform for your business</p>
          </div>
          <form className="login-form">
            <div className="input-group">
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin@gmail.com" />
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
              Log in
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
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
      <div className="signin-img">
        <img src={signin_img} />
      </div>
    </div>
  );
}
