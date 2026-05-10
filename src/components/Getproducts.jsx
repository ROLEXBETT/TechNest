import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import "../css/Getproducts.css";
import Mycarousel from './Mycarousel';
import Chatbot from './Chatbot'; 
import { useCart } from './CartContext'; 

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const img_url = "https://rolexbett.alwaysdata.net/static/images/";

  // 1. Extract params from URL
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get('search') || '';
  const sortOrder = params.get('sort') || 'Newest';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://rolexbett.alwaysdata.net/api/get_products");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Error connecting to server.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Filter and then Sort
  let displayProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.product_name.toLowerCase().includes(query) ||
      product.product_description.toLowerCase().includes(query)
    );
  });

  // Apply Sorting Logic
  displayProducts.sort((a, b) => {
    if (sortOrder === "PriceLow") return Number(a.product_cost) - Number(b.product_cost);
    if (sortOrder === "PriceHigh") return Number(b.product_cost) - Number(a.product_cost);
    if (sortOrder === "AlphaAZ") return a.product_name.localeCompare(b.product_name);
    if (sortOrder === "AlphaZA") return b.product_name.localeCompare(a.product_name);
    return 0; // Default: Newest
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.product_name} added to cart!`);
  };

  return (
    <div className="main-wrapper">
      <div className="cart-fixed-container" onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
        <FaShoppingCart size={28} />
        <span className="cart-badge-count">{cartItems.length}</span>
      </div>

      <Chatbot />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-primary">Available Laptops 💻</h1>
          <p className="text-muted">Premium tech - Smart Laptop Hub</p>
        </div>

        {(!searchQuery && sortOrder === "Newest") && <Mycarousel />}

        <div className="mt-5">
          {loading && <Loader />}
          {error && <p className="alert alert-danger text-center">{error}</p>}

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 px-2">
            {displayProducts.length > 0 ? (
              displayProducts.map((product, index) => (
                <div className="col" key={index}>
                  <div className="card h-100 product-card shadow-sm border-0" style={{ borderRadius: '15px' }}>
                    <div className="img-container" style={{ height: '180px', background: '#f8f9fa' }}>
                      <img
                        src={img_url + product.product_photo}
                        alt={product.product_name}
                        className="product-img w-100 h-100"
                        style={{ objectFit: 'contain', padding: '10px' }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column text-center">
                      <h6 className="card-title fw-bold text-dark mb-1">{product.product_name}</h6>
                      <p className="card-text text-muted extra-small flex-grow-1" style={{ fontSize: '0.7rem' }}>
                        {product.product_description.slice(0, 60)}...
                      </p>
                      <div className="mt-auto pt-2">
                        <div className="mb-2">
                          <span className="fw-bold text-primary fs-6">
                            KSh {Number(product.product_cost).toLocaleString()}
                          </span>
                        </div>
                        <button
                          className="btn btn-primary w-100 rounded-pill fw-bold mb-2 purchase-btn btn-sm"
                          onClick={() => navigate("/makepayment", { state: { product } })}
                        >
                          PURCHASE
                        </button>
                        <button
                          className="btn btn-outline-primary w-100 rounded-pill fw-bold btn-sm"
                          onClick={() => handleAddToCart(product)}
                        >
                          + CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !loading && products.length > 0 && (
                <div className="w-100 text-center mt-5 py-5">
                  <h4 className="text-muted">No laptops found.</h4>
                  <button className="btn btn-primary mt-2" onClick={() => navigate('/shop')}>Reset</button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Getproducts;