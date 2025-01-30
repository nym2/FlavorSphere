// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';  // Import your pages
import CreateRecipe from './pages/CreateRecipe';
import RecipeList from './pages/RecipeList';
import CreateCategory from './pages/CreateCategory.jsx';  // Import CreateCategory page
import EditCategory from './pages/EditCategory.jsx';      // Import EditCategory page
import Navbar from './components/Header'; // Import your Navbar

function App() {
  return (
    <Router>
      <Navbar /> {/* Include your navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/create-category" element={<CreateCategory />} /> {/* Define route for create category */}
        <Route path="/edit-category" element={<EditCategory />} />       {/* Define route for edit category */}
      </Routes>
    </Router>
  );
}

export default App;
