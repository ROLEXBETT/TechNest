import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('Newest');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    setUser(loggedInUser ? JSON.parse(loggedInUser) : null);
    
    // Sync sort state with URL if user navigates back/forward
    const params = new URLSearchParams(location.search);
    if (params.get('sort')) setSort(params.get('sort'));
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${query}&sort=${sort}`);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    // Instant update: navigate immediately when dropdown changes
    navigate(`/shop?search=${query}&sort=${newSort}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/shop">
          TECH<span className="text-warning">NEST</span>
        </Link>

        <form className="d-flex mx-auto align-items-center" style={{ width: '45%' }} onSubmit={handleSearch}>
          <select 
            className="form-select rounded-pill border-0 px-2 me-2" 
            style={{ width: '140px', fontSize: '0.8rem', fontWeight: '600', color: '#191cce', height: '35px' }}
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="Newest">Newest</option>
            <option value="PriceLow">Price: Low - High</option>
            <option value="PriceHigh">Price: High - Low</option>
            <option value="AlphaAZ">Name: A - Z</option>
            <option value="AlphaZA">Name: Z - A</option>
          </select>

          <input 
            className="form-control rounded-pill border-0 px-3 me-2" 
            style={{ height: '35px', fontSize: '0.9rem' }}
            type="text" 
            placeholder="Search..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button 
            className="btn btn-danger rounded-pill fw-bold px-3" 
            type="submit" 
            style={{ backgroundColor: '#ff4b4b', height: '35px', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}
          >
            GO
          </button>
        </form>

        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <Link className="nav-link px-2" style={{ fontSize: '0.9rem' }} to="/shop">Home</Link>
          </li>
          {!user ? (
            <li className="nav-item ms-2">
              <Link className="btn btn-warning rounded-pill px-3 fw-bold btn-sm" to="/signup">Join</Link>
            </li>
          ) : (
            <li className="nav-item ms-2">
              <button className="btn btn-danger rounded-pill px-3 btn-sm" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;