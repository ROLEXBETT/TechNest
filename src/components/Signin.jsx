import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Signin.css"; 
import Footer from './Footer';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Form submitted for:", email);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    // The page-wrapper handles the vertical layout
    <div className="page-wrapper">
      <div className="signin-container">
        <div className="signin-card">
          <h2 className="title">Welcome Back</h2>
          <p className="subtitle">Login to continue</p>

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
      
      {/* Footer is now a direct child of page-wrapper */}
      {/* <Footer /> */}
    </div>
  );
};

export default Signin;