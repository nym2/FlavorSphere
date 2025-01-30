import { Link } from "react-router-dom";
import "../styles/main.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>FlavorSphere</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Add Recipe</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
