import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('technest_cart');

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'technest_cart',
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // Add Product To Cart
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // Remove Product From Cart
  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => item.product_id !== productId
      )
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => useContext(CartContext);