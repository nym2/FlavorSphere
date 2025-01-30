// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';  // Import the Header component
import RecipeList from './pages/RecipeList.jsx';
import RecipeDetails from './pages/RecipeDetailsPage.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import EditRecipe from './pages/EditRecipe.jsx';
import HomePage from './pages/Home.jsx';

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
