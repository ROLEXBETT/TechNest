import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'; // Import your new footer
import "../css/Signup.css"; 

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    console.log("Laptop store account created:", formData.email);
  };

  return (
    <div className="page-wrapper">
      <main className="signup-content">
        <div className="signup-container">
          <div className="signup-card">
            <h2 className="title">Create Account</h2>
            <p className="subtitle">Join Technest Laptops</p>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="input-group-custom">
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
              </div>
              <div className="input-group-custom">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              </div>
              <div className="input-group-custom">
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              </div>
              <div className="input-group-custom">
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
              </div>
              <button type="submit">Sign Up</button>
            </form>

            <p className="footer-text">
              Already have an account? <Link to="/signin">Login</Link>
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer is now OUTSIDE the main content, but INSIDE the wrapper */}
      {/* <Footer /> */}
    </div>
  );
};

export default Signup;