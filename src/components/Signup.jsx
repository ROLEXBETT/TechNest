import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("password", formData.password);

      const response = await axios.post(
        "https://rolexbett.alwaysdata.net/api/signup",
        data
      );

      if (response.data.message === "user registered successfully.") {
        alert("Account created successfully!");
        navigate("/signin");
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Server error. Please check your connection.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <main className="signup-content">
        <div className="signup-container">
          <div className="signup-card">
            <h2 className="title">Create Account</h2>
            <p className="subtitle">Join Technest Laptops</p>

            {error && (
              <div
                className="alert alert-danger py-2 mb-3 text-center"
                style={{ fontSize: '0.8rem' }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-group-custom">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={formData.username}
                  required
                />
              </div>

              <div className="input-group-custom">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>

              <div className="input-group-custom">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={formData.phone}
                  required
                />
              </div>

              <div className="input-group-custom">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </div>

              <div className="input-group-custom">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="signup-button">
                {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
              </button>
            </form>

            <p className="footer-text">
              Already have an account?{" "}
              <Link to="/signin" className="login-link">Login</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;