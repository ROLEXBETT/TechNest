import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 🚫</h1>
      <p>Sorry, page not found</p>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default Notfound;