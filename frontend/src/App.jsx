// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Import the Header component
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import RecipeDetails from './pages/RecipeDetails';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import HomePage from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Display the Header with navigation links */}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
