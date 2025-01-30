// src/components/Header.js
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
        <li><Link to="/create-recipe">Create Recipe</Link></li>
      </ul>
    </nav>
  );
}

export default Header;
