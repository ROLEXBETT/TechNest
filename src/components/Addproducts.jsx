import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import '../css/Addproducts.css'; // We'll create this file next

const Addproducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductPhoto(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); // Show preview of the laptop
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const formdata = new FormData();
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      const response = await axios.post("https://rolexbett.alwaysdata.net/api/add_products", formdata);

      setLoading(false);
      setSuccess(response.data.message);

      // Reset form
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto(null);
      setPreview(null);
      e.target.reset();

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className='container add-product-wrapper'>
      <div className='row justify-content-center'>
        <div className="col-md-8 col-lg-6">
          <div className="card product-card shadow-lg border-0">
            <div className="card-header bg-white border-0 pt-4 text-center">
              <h3 className='fw-bold text-dark'>Add New Laptop</h3>
              <p className="text-muted">Enter the inventory details below</p>
            </div>

            <div className="card-body px-4 pb-4">
              {loading && <Loader />}
              {success && <div className="alert alert-success border-0 fade show">{success}</div>}
              {error && <div className="alert alert-danger border-0 fade show">{error}</div>}

              <form onSubmit={handleSubmit} className="custom-form">
                <div className="mb-3">
                  <label className="form-label small fw-bold">Laptop Model Name</label>
                  <input type="text" placeholder='e.g. MacBook Pro M3' className='form-control custom-input' required value={product_name} onChange={(e) => setProductName(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Description</label>
                  <textarea rows="3" placeholder='Specs, RAM, Storage...' className='form-control custom-input' required value={product_description} onChange={(e) => setProductDescription(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Price (KES)</label>
                  <input type="number" placeholder='0.00' className='form-control custom-input' required value={product_cost} onChange={(e) => setProductCost(e.target.value)} />
                </div>

                <div className="mb-4">
                  <label className='form-label small fw-bold'>Laptop Image</label>
                  <div className="upload-box">
                    <input type="file" id="file-upload" className='d-none' required accept='image/*' onChange={handleImageChange} />
                    <label htmlFor="file-upload" className="upload-label text-center">
                      {preview ? <img src={preview} alt="Preview" className="img-preview" /> : <span>Click to upload image</span>}
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold shadow-sm">
                  Add Product to Store
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addproducts;