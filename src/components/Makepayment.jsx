import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {
    const { product } = useLocation().state || {};
    const navigate = useNavigate();
    const img_url = "https://rolexbett.alwaysdata.net/static/images/";

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Clear previous errors
        setSuccess("");

        try {
            const formdata = new FormData();
            formdata.append("phone", number);
            formdata.append("amount", product.product_cost);

            const response = await axios.post("https://rolexbett.alwaysdata.net/api/mpesa_payment", formdata);
            setLoading(false);
            setSuccess(response.data.message);
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    if (!product) return <div className="container mt-5 text-center">No product selected. <button onClick={() => navigate('/')}>Go Back</button></div>;

    return (
        <div className="col-md-10 col-lg-8">
    
    {/* Header & Back Button Fixed */}
    <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary back-btn" onClick={() => navigate("/")}>
            &larr; Back
        </button>
        <h1 className="fw-bold mb-0">Checkout</h1>
    </div>

    <div className="card border-0 shadow-lg overflow-hidden">
        <div className="row g-0">
            {/* Left Side: Image */}
            <div className="col-md-5 image-container">
                <img 
                    src={img_url + product.product_photo} 
                    alt={product.product_name} 
                    className='img-fluid p-4'
                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
            </div>

            {/* Right Side: Content */}
            <div className="col-md-7 p-4">
                <div className="text-start"> {/* Align text to the left for better flow */}
                    <small className="text-muted text-uppercase fw-bold">Order Summary</small>
                    <h2 className="text-primary fw-bold mb-2">{product.product_name}</h2>
                    <p className="text-secondary small mb-4">{product.product_description}</p>
                    
                    <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-3" 
                        style={{ backgroundColor: "#f8f9fa", border: "1px dashed #ced4da" }}>
                        <span className="text-muted fw-bold">Total Amount:</span>
                        <span className="h3 mb-0 text-success fw-bold">KES {product.product_cost}</span>
                    </div>

                    <form onSubmit={handlesubmit}>
                        <label className="form-label fw-bold text-dark small">M-Pesa Phone Number</label>
                        <div className="input-group mb-3 shadow-sm">
                            <span className="input-group-text bg-white fw-bold">254</span>
                            <input 
                                type="number"
                                className='form-control form-control-lg'
                                placeholder='7XXXXXXXX'
                                required
                                value={number}
                                onChange={(e) => setNumber(e.target.value)} 
                            />
                        </div>

                        <button type="submit" className='btn btn-success btn-lg w-100 mpesa-btn shadow' disabled={loading}>
                            {loading ? 'Processing...' : 'Pay with M-Pesa'}
                        </button>
                        <p className="text-center mt-3 text-muted small">
                            <i className="bi bi-shield-lock me-1"></i>
                            Secure Encrypted Payment
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
       
    );
};

export default Makepayment;