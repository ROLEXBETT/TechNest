import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import "../css/Getproducts.css";

const Getproducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const img_url = "https://rolexbett.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://rolexbett.alwaysdata.net/api/get_products"
      );

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

  // ✅ RETURN MUST BE INSIDE FUNCTION
  return (
    <div className="products-container">
      <h1 className="page-title">Available Laptops 💻</h1>

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}

      <div className="products-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img
              src={img_url + product.product_photo}
              alt={product.product_name}
              className="product-img"
            />

            <div className="card-body">
              <h3>{product.product_name}</h3>

              <p>
                {product.product_description.slice(0, 80)}...
              </p>

              <h4 className="price">KES {product.product_cost}</h4>

              <button
                onClick={() =>
                  navigate("/makepayment", { state: { product } })
                }
              >
                Purchase Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getproducts;