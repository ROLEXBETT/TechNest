import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Context Provider
import { CartProvider } from './components/CartContext';

// Components
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';
import Getproducts from './components/Getproducts'; // Using this for Shop inventory
import Footer from './components/Footer';
import Cart from './components/Cart';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar />

          <header className="bg-light py-4 border-bottom shadow-sm text-center">
            <div className="container">
              <h2 className="text-primary fw-bold mb-0">
                Welcome to <span className="text-dark">Tech</span>Nest
              </h2>
              <p className="text-muted small">Premium laptops at student-friendly prices</p>
            </div>
          </header>

          <main className="flex-grow-1">
            <div className="container mt-4">
              <Routes>
                {/* The Shop route uses your existing Getproducts logic */}
                <Route path="/" element={<Getproducts />} />
                <Route path="/shop" element={<Getproducts />} />
                
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/addproducts" element={<Addproducts />} />
                <Route path="/makepayment" element={<Makepayment />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;