import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// This path moves up from 'components' into 'src', then finds the 'css' folder
import "../css/Signin.css"; 

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://rolexbett.alwaysdata.net/api/signin",
        formData
      );

      if (response.data.user) {
        // Store user session data in browser
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        alert("Welcome back to TechNest!");
        
        // Take the buyer directly to the laptop shop
        navigate("/shop"); 
      } else {
        setError(response.data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      const errorMessage = err.response?.data?.message || "Server error. Check AlwaysData logs.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="signin-container">
        <div className="signin-card shadow-lg">
          <h2 className="title text-primary">TechNest Login</h2>
          <p className="subtitle">Sign in to browse our premium laptops</p>

          {error && (
            <div className="alert alert-danger py-2 mb-3 text-center" style={{ fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group-custom mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group-custom password-group mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold' }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-100 fw-bold py-2 shadow-sm">
              {loading ? "Authenticating..." : "SIGN IN TO SHOP"}
            </button>
          </form>

          <p className="footer-text mt-3 text-center">
            New here? <Link to="/signup" className="text-warning text-decoration-none fw-bold">Create an Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;