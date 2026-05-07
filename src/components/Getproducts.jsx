import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import "../css/Getproducts.css";
import Mycarousel from './Mycarousel';
import Chatbot from './Chatbot'; 
// 1. Import the global context hook
import { useCart } from './CartContext'; 

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // 2. Use global state instead of local useState/localStorage here
  const { cartItems, addToCart } = useCart();

  const navigate = useNavigate();
  const img_url = "https://rolexbett.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://rolexbett.alwaysdata.net/api/get_products");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 3. Updated handler to use the context function
  const handleAddToCart = (product) => {
    addToCart(product);
    // Optional: Keep the alert or replace with a toast notification
    alert(`${product.product_name} added to cart!`);
  };

  return (
    <div className="main-wrapper">
      
      {/* BLUE FLOATING CART (BOTTOM RIGHT) */}
      <div className="cart-fixed-container" onClick={() => navigate('/cart')}>
        <FaShoppingCart size={28} />
        {/* 4. Use cartItems.length from context */}
        <span className="cart-badge-count">{cartItems.length}</span>
      </div>

      <Chatbot />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-primary">Available Laptops 💻</h1>
          <p className="text-muted">Smart tech meets smart prices at TechNest</p>
        </div>

        <Mycarousel />

        <div className="mt-5">
          {loading && <Loader />}
          {error && <p className="alert alert-danger text-center">{error}</p>}

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 px-2">
            {products.map((product, index) => (
              <div className="col" key={index}>
                <div className="card h-100 product-card shadow-sm">
                  <div className="img-container">
                    <img
                      src={img_url + product.product_photo}
                      alt={product.product_name}
                      className="product-img"
                    />
                  </div>
                  <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title fw-bold">{product.product_name}</h5>
                    <p className="card-text text-muted small flex-grow-1">
                      {product.product_description.slice(0, 60)}...
                    </p>
                    <div className="mt-auto pt-3">
                      <div className="mb-3">
                        {/* 5. Displaying KSh with formatting */}
                        <span className="price-tag fw-bold text-dark">
                          KSh {Number(product.product_cost).toLocaleString()}
                        </span>
                      </div>
                      <button
                        className="btn btn-primary w-100 rounded-pill fw-bold mb-2 purchase-btn"
                        onClick={() => navigate("/makepayment", { state: { product } })}
                      >
                        PURCHASE NOW
                      </button>
                      <button
                        className="btn btn-add-cart w-100 rounded-pill fw-bold"
                        style={{ border: '2px solid #007bff', color: '#007bff' }}
                        onClick={() => handleAddToCart(product)}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Getproducts;