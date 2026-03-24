import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import Footer from './Footer'; // 1. Import Footer
import { useNavigate } from 'react-router-dom';
import "../css/Getproducts.css";
import Mycarousel from './Mycarousel';

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

 return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">Available Laptops 💻</h1>
        <p className="text-muted">Smart tech meets smart prices at TechNest</p>
      </div>

      <Mycarousel />

      <div className="mt-5">
        {loading && <Loader />}
        {error && <p className="alert alert-danger text-center">{error}</p>}

        {/* This row controls how many columns appear at different screen sizes */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 px-2">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <div className="card h-100 border-0 shadow-sm product-card">
                <div className="img-container">
                  <img
                    src={img_url + product.product_photo}
                    alt={product.product_name}
                    className="card-img-top product-img"
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-dark">{product.product_name}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {product.product_description.slice(0, 80)}...
                  </p>
                  <div className="mt-auto">
                    <h5 className="price text-primary fw-bold mb-3">
                      KES {Number(product.product_cost).toLocaleString()}
                    </h5>
                    <button
                      className="btn btn-primary w-100 rounded-pill fw-bold purchase-btn"
                      onClick={() => navigate("/makepayment", { state: { product } })}
                    >
                      Purchase Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Getproducts;