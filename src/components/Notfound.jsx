import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../css/Notfound.css"; // Ensure this path is correct

const Notfound = () => {
  return (
    <div className="page-wrapper">
      <div className="notfound-container">
        <div className="notfound-content">
          <h1 className="error-code">404</h1>
          <div className="error-icon">💻🚫</div>
          <h2 className="error-message">Oops! Laptop Not Found</h2>
          <p className="error-description">
            The page you're looking for has been moved or doesn't exist in our inventory.
          </p>
          <Link to="/" className="home-btn">
            Return to Store
          </Link>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Notfound;