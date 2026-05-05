import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        {/* Brand Name */}
        <Link className="navbar-brand fw-bold fs-3" to="/">
          TECH<span className="text-warning">NEST</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">Home</Link>
            </li>
            {/* <li className="nav-item"> */}
              {/* <Link className="nav-link px-3" to="/getproducts">Shop</Link> */}
            {/* </li> */}
            {/* <li className="nav-item"> */}
              {/* <Link className="nav-link px-3" to="/addproducts text-warning">Sell Product</Link> */}
            {/* </li> */}
            
            {/* Auth Buttons */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <Link className="btn btn-outline-light rounded-pill px-4 me-2" to="/signin">
                Login
              </Link>
            </li>
            <li className="nav-item mt-2 mt-lg-0">
              <Link className="btn btn-warning rounded-pill px-4 fw-bold" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;