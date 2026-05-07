import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Shop.css'; // Ensure this CSS file exists for your grid

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        // Replace with your actual AlwaysData API endpoint
        const response = await axios.get('https://rolexbett.alwaysdata.net/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching laptops:", error);
        setLoading(false);
      }
    };
    fetchLaptops();
  }, []);

  if (loading) return <div className="loader">Loading TechNest Inventory...</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Laptops 💻</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm border-0">
              <img 
                src={product.image_url || 'https://via.placeholder.com/150'} 
                className="card-img-top p-3" 
                alt={product.name} 
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{product.name}</h5>
                <p className="card-text text-muted small">{product.description}</p>
                <p className="text-primary fw-bold">KSh {product.price.toLocaleString()}</p>
                <button className="btn btn-danger w-100 mb-2 rounded-pill">PURCHASE NOW</button>
                <button className="btn btn-outline-primary w-100 rounded-pill">ADD TO CART</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;