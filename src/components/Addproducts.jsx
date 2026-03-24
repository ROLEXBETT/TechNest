import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import Footer from './Footer';

const Addproducts = () => {

  // introduce the hooks
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  //declare the additional hook to manage the state of the application
  const[loading,setLoading] = useState(false);
  const[success,setSuccess] = useState("");
  const[error,setError] = useState("");

  //create a function that will handle the submit action
  const handleSubmit = async (e) =>{
    // Below we prevent our site from reloading
    e.preventDefault()

   // Update our loading hook with a message(activate it)
    setLoading(true)
    try{
      // create a formddata
      const formdata = new FormData()

      //append the details of the form data
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      //interact with axios to help you use the method post
      const response = await axios.post("https://rolexbett.alwaysdata.net/api/add_products", formdata)

      //set the loading hook back to default
      setLoading(false)

      //update the success hook with a message
      setSuccess(response.data.message)

  //clear your hooks (setting them back to default/empty)
  setProductName("");
  setProductDescription("");
  setProductCost("");
  setProductPhoto("");

  e.target.reset()

  setTimeout(() => {
        setSuccess("");
      }, 5000);
  }

  
  catch(error){
    //set loading hook back to default
    setLoading(false)

    //update the setEror with message
    setError(error.message)

  }
  
   }

  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-5">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            
            {/* Header Section */}
            <div className="card-header bg-primary py-4 text-center">
              <h3 className="text-white fw-bold mb-0">Add New Product</h3>
              <p className="text-white-50 small mb-0">Fill in the details to list your item</p>
            </div>

            <div className="card-body p-4 p-md-5">
              {/* Status Messages */}
              {loading && <div className="text-center mb-3"><Loader /></div>}
              
              {success && (
                <div className="alert alert-success border-0 shadow-sm mb-4">
                  <i className="bi bi-check-circle-fill me-2"></i> {success}
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger border-0 shadow-sm mb-4">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Product Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Laptop Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. apple,hp,"
                    className="form-control form-control-lg bg-light border-0 shadow-sm"
                    required
                    value={product_name}
                    onChange={(e) => setProductName(e.target.value)} 
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea 
                    placeholder="Tell us about the product..."
                    className="form-control bg-light border-0 shadow-sm"
                    rows="3"
                    required 
                    value={product_description}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Price (ksh)</label>
                  <div className="input-group shadow-sm">
                  
                    <input 
                      type="number"
                      placeholder="0.00"
                      className="form-control form-control-lg bg-light border-0"
                      required
                      value={product_cost}
                      onChange={(e) => setProductCost(e.target.value)} 
                    />
                  </div>
                </div>

                {/* File Upload with Preview Logic */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Product Photo</label>
                  <div className="upload-box p-3 border-2 border-dashed rounded-3 text-center bg-light">
                    <input 
                      type="file"
                      className="form-control border-0 bg-transparent"
                      required
                      accept="image/*"
                      onChange={(e) => setProductPhoto(e.target.files[0])}
                    />
                    {product_photo && (
                      <p className="text-muted small mt-2">
                         Ready to upload: <strong>{product_photo.name}</strong>
                      </p>
                    )}
                  </div>
                </div>

                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg fw-bold shadow-sm rounded-pill py-3"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Upload Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Addproducts;