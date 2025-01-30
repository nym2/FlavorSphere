// src/components/Header.js
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create-recipe">Create Recipe</Link></li>
        <li><Link to="/recipes">View Recipes</Link></li>
        <li><Link to="/create-category">Create Category</Link></li> 
        <li><Link to="/edit-category">Edit Category</Link></li> 
      </ul>
    </nav>
  );
}

export default Header;
