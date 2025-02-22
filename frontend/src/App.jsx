// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';  
import CreateRecipe from './pages/CreateRecipe';
import RecipeList from './pages/RecipeList';
import CreateCategory from './pages/CreateCategory.jsx';  
import EditRecipes from './pages/EditRecipe.jsx';      
import Navbar from './components/Header'; 
import RecipeDetailsPage from './pages/RecipeDetailsPage.jsx';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/create-category" element={<CreateCategory />} /> 
        <Route path="/edit-recipes" element={<EditRecipes />} />
        <Route path="/RecipeDetailsPage/:id" element={<RecipeDetailsPage />} />       
      </Routes>
    </Router>
  );
}

export default App;
