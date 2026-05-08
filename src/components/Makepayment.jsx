import React, { useState } from 'react'; // Added useState
import { useLocation, useNavigate } from 'react-router-dom'; // Added useLocation, useNavigate
import axios from 'axios'; // Added axios
import Loader from './Loader';

const Makepayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Destructure all possible state data (handling both single product and full cart)
    const { product, isCartCheckout, totalAmount, items } = location.state || {};
    
    const img_url = "https://rolexbett.alwaysdata.net/static/images/";

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Determine display values
    const displayPrice = isCartCheckout ? totalAmount : product?.product_cost;
    const displayTitle = isCartCheckout ? "Cart Checkout" : product?.product_name;
    const displayImage = isCartCheckout ? "" : (img_url + product?.product_photo);

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const formdata = new FormData();
            formdata.append("phone", number);
            formdata.append("amount", displayPrice);

            const response = await axios.post("https://rolexbett.alwaysdata.net/api/mpesa_payment", formdata);
            setLoading(false);
            setSuccess(response.data.message);
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    if (!product && !isCartCheckout) {
        return (
            <div className="container mt-5 text-center">
                <h3>No items selected for payment.</h3>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/shop')}>Go Back to Shop</button>
            </div>
        );
    }

    return (
        <div className="page-wrapper py-5">
            <div className="container checkout-container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        
                        {success && <div className="alert alert-success border-0 shadow-sm">{success}</div>}
                        {error && <div className="alert alert-danger border-0 shadow-sm">{error}</div>}

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <button className="btn btn-outline-secondary back-btn" onClick={() => navigate("/shop")}>
                                &larr; Back to Shop
                            </button>
                            <h1 className="fw-bold mb-0">Checkout</h1>
                        </div>

                        <div className="card border-0 shadow-lg overflow-hidden">
                            <div className="row g-0">
                                <div className="col-md-5 image-container bg-light d-flex align-items-center justify-content-center">
                                    {isCartCheckout ? (
                                        <div className="text-center p-4">
                                            <h4 className="text-primary fw-bold">{items?.length} Items</h4>
                                            <p className="text-muted small">Multi-product order</p>
                                        </div>
                                    ) : (
                                        <img 
                                            src={displayImage} 
                                            alt={displayTitle} 
                                            className='img-fluid p-4'
                                            style={{ maxHeight: '300px', objectFit: 'contain' }}
                                        />
                                    )}
                                </div>

                                <div className="col-md-7 p-4">
                                    <div className="text-start">
                                        <small className="text-muted text-uppercase fw-bold">Order Summary</small>
                                        <h2 className="text-primary fw-bold mb-2">{displayTitle}</h2>
                                        
                                        <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-3" 
                                            style={{ backgroundColor: "#f8f9fa", border: "1px dashed #ced4da" }}>
                                            <span className="text-muted fw-bold">Total to Pay:</span>
                                            <span className="h3 mb-0 text-success fw-bold">KES {Number(displayPrice).toLocaleString()}</span>
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

                                            {loading && <Loader />}
                                            <button type="submit" className='btn btn-success btn-lg w-100 mpesa-btn shadow' disabled={loading}>
                                                {loading ? 'Processing...' : 'Pay with M-Pesa'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Makepayment; // This is the default export required by App.js