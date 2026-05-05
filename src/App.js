import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Bootstrap CSS and JS (Bundle includes Popper for dropdowns/toggles)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Components
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';
import Getproducts from './components/Getproducts';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        
        {/* The Navbar will now appear on every page */}
        <Navbar />

        {/* Hero Header - Optional: You can move this into a "Home" component if you only want it on the landing page */}
        <header className="bg-light py-4 border-bottom shadow-sm text-center">
          <div className="container">
            <h2 className="text-primary fw-bold mb-0">
              Welcome to <span className="text-dark">Tech</span>Nest
            </h2>
            <p className="text-muted small">Where smart tech meets smart prices</p>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow-1">
          <div className="container mt-4">
            <Routes>
              Home / Shop
              <Route path="/" element={<Getproducts />} />
              
              {/* Auth Routes */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              
              {/* Product & Payment Management */}
              <Route path="/addproducts" element={<Addproducts />} />
              <Route path="/makepayment" element={<Makepayment />} />
              
              {/* 404 Route */}
              <Route path="*" element={<Notfound />} />
            </Routes>
          </div>
        </main>

        {/* Footer will stay at the bottom of every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;