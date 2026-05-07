import React from 'react';
import { useCart } from './CartContext';
// Points to the correct folder to resolve the "Module not found" error
import '../css/Cart.css'; 

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  // Sums the product_cost field from your database items
  const total = cartItems.reduce((acc, item) => acc + Number(item.product_cost || 0), 0);

  return (
    <div className="cart-wrapper">
      <h2 className="cart-title">Your Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is currently empty.</div>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item-box">
                <div className="item-info">
                  <h5>{item.product_name}</h5>
                  <p>KSh {Number(item.product_cost).toLocaleString()}</p>
                </div>
                <button 
                  className="red-bar-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  REMOVE
                </button>
              </div>
            ))}
          </div>

          <div className="summary-box shadow-lg">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="total-text">Total Amount:</span>
              <span className="total-price">
                KSh {total.toLocaleString()}
              </span>
            </div>
            <button className="red-bar-btn" style={{ marginTop: '0' }}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;