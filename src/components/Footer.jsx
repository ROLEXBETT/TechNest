import React from 'react';
import { Link } from 'react-router-dom';
import "../css/Footer.css"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand & Mission */}
        <div className="footer-section brand">
          <h2 className="footer-logo">TECHNEST</h2>
          <p>Premium laptops for professionals, gamers, and students. Experience high performance with every click.</p>
        </div>

        {/* Categories - Specific to Laptops */}
        <div className="footer-section links">
          <h3>Shop Laptops</h3>
          <ul>
            <li><Link to="/getproducts?cat=gaming">Gaming Laptops</Link></li>
            <li><Link to="/getproducts?cat=macbook">MacBooks</Link></li>
            <li><Link to="/getproducts?cat=ultrabook">Ultrabooks</Link></li>
            <li><Link to="/getproducts?cat=accessories">Laptop Accessories</Link></li>
          </ul>
        </div>

        {/* Support & Services */}
        <div className="footer-section links">
          <h3>Customer Service</h3>
          <ul>
            <li><Link to="/makepayment">Payment Options</Link></li>
            <li><Link to="/notfound">Warranty Policy</Link></li>
            <li><Link to="/notfound">Shipping & Returns</Link></li>
            <li><Link to="/signin">Track My Order</Link></li>
          </ul>
        </div>

        {/* Contact/Newsletter */}
        <div className="footer-section contact">
          <h3>Laptop Deals</h3>
          <p>Subscribe to get the latest tech drops and discounts.</p>
          <div className="newsletter">
            <input type="email" placeholder="Email address" />
            <button type="button">Subscribe</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} TECHNEST. Your Trusted Tech Partner.</p>
        <div className="social-placeholder">
          {/* You can add icons here later */}
          <span>FB</span> | <span>IG</span> | <span>TW</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;