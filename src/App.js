import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { CartProvider } from './components/CartContext';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';
import Getproducts from './components/Getproducts'; 
import Footer from './components/Footer';
import Cart from './components/Cart';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar />

          <main className="flex-grow-1">
            <Routes>
              {/* If someone goes to "/", they go to Signin first */}
              <Route path="/" element={<Navigate to="/signin" />} />
              
              {/* This is the page users see AFTER logging in */}
              <Route path="/shop" element={<Getproducts />} />
              
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/addproducts" element={<Addproducts />} />
              <Route path="/makepayment" element={<Makepayment />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;