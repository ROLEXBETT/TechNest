import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import "../css/Getproducts.css";
import Mycarousel from './Mycarousel';
import Chatbot from './Chatbot';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IMG_URL = process.env.REACT_APP_IMG_URL || "https://rolexbett.alwaysdata.net/static/images/";
const API_URL = process.env.REACT_APP_API_URL || "https://rolexbett.alwaysdata.net/api";

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch products with AbortController to avoid state updates on unmounted component
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${API_URL}/get_products`, {
          signal: controller.signal,
        });
        setProducts(response.data);
      } catch (err) {
        if (axios.isCancel(err)) return; // Ignore abort errors
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort(); // Cleanup on unmount
  }, []);

  // Cart: support quantity tracking instead of duplicates
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product_name === product.product_name
      );

      if (existingIndex !== -1) {
        // Item already in cart — increment quantity
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1,
        };
        toast.info(`${product.product_name} quantity updated in cart.`);
        return updated;
      } else {
        // New item — add with quantity 1
        toast.success(`${product.product_name} added to cart!`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Total item count (sum of quantities)
  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Truncate description at word boundary
  const truncateDescription = (text, maxLength = 60) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <div className="main-wrapper">

      {/* Floating Cart Button (Bottom Right) */}
      <div className="cart-fixed-container" onClick={() => navigate('/cart')}>
        <FaShoppingCart size={28} />
        {cartItemCount > 0 && (
          <span className="cart-badge-count">{cartItemCount}</span>
        )}
      </div>

      {/* AI Assistant (Bottom Left) */}
      <Chatbot />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-primary">Available Laptops 💻</h1>
          <p className="text-muted">Smart tech meets smart prices at TechNest</p>
        </div>

        <Mycarousel />

        <div className="mt-5">
          {loading && <Loader />}

          {error && (
            <div className="alert alert-danger text-center">
              {error}
              <button
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted fs-5">No products available at the moment. Check back soon!</p>
            </div>
          )}

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 px-2">
            {products.map((product) => (
              <div className="col" key={product.id || product.product_name}>
                <div className="card h-100 product-card">
                  <div className="img-container">
                    <img
                      src={IMG_URL + product.product_photo}
                      alt={product.product_name}
                      className="product-img"
                    />
                  </div>
                  <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title fw-bold">{product.product_name}</h5>
                    <p className="card-text text-muted small flex-grow-1">
                      {truncateDescription(product.product_description)}
                    </p>
                    <div className="mt-auto pt-3">
                      <div className="mb-3">
                        <span className="price-tag">
                          KES {Number(product.product_cost).toLocaleString()}
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
                        onClick={() => addToCart(product)}
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