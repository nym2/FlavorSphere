// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';  // Import the Header component
import RecipeList from './pages/RecipeList.jsx';
import RecipeDetails from './pages/RecipeDetailsPage.jsx';  // Corrected import for RecipeDetails
import CreateRecipe from './pages/CreateRecipe.jsx';  // CreateRecipe page
import EditRecipe from './pages/EditRecipe.jsx';
import HomePage from './pages/Home.jsx';  // Corrected import for HomePage

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Display the Header with navigation links */}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/create-recipe" element={<CreateRecipe />} /> {/* CreateRecipe route */}
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
