// src/components/Header.js
import { Link } from 'react-router-dom';
// import './Header.css';   Import CSS for header styling

function Header() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
        <li><Link to="/create-recipe">Create Recipe</Link></li>
      </ul>
    </nav>
  );
}

export default Header;
