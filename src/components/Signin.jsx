import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Signin.css"; 

const Signin = () => {
  // --- 1. DECLARE ALL VARIABLES (Fixes 'no-undef' errors) ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- 2. DEFINE THE SUBMIT FUNCTION (Fixes 'handleSubmit' is not defined) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // This simulates a login attempt
    console.log("Form submitted for:", email);

    setTimeout(() => {
      setLoading(false);
      // Example of how to trigger the error message:
      // setError("Invalid credentials. Please try again.");
    }, 2000);
  };

  // --- 3. RETURN THE JSX ---
  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

        {/* This block only shows if 'error' is not null */}
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group-custom">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group-custom password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="footer-text">
          Don’t have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

// --- 4. EXPORT THE COMPONENT ---
export default Signin;