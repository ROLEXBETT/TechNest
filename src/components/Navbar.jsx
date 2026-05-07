import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Redirects to home page with search parameters
      navigate(`/?search=${query}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          TECH<span className="text-warning">NEST</span>
        </Link>

        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
          {/* Search Input and Button matching image_267bd2.png */}
          <form className="d-flex mx-auto" style={{ width: '40%' }} onSubmit={handleSearch}>
            <input 
              className="form-control rounded-pill border-0 px-3 me-2" 
              type="text" 
              placeholder="Search laptops..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-danger rounded-pill fw-bold px-4" type="submit" style={{ backgroundColor: '#ff4b4b' }}>
              SEARCH
            </button>
          </form>

          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">Home</Link>
            </li>
            <li className="nav-item ms-lg-3">
              <Link className="btn btn-outline-light rounded-pill px-4 me-2" to="/signin">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-warning rounded-pill px-4 fw-bold" to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;