import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

// Components
import HomePage from './components/HomePage'; // Component to display list of recipes
import RecipeDetailsPage from './components/RecipeDetailsPage'; // Component to show details of a recipe
import CreateEditRecipePage from './components/CreateEditRecipePage'; // Component to create/edit recipes

function App() {
    const [recipes, setRecipes] = useState([]);

    // Fetching the recipes from the backend when the component mounts
    useEffect(() => {
        fetch("http://localhost:5000/recipes")
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error("Error fetching recipes:", error));
    }, []);

    return (
        <Router>
            <div className="App">
                <h1>Welcome to FlavorSphere</h1>
                
                {/* Navigation */}
                <nav>
                    <a href="/">Home</a>
                    <a href="/create">Create Recipe</a>
                </nav>

                {/* Routes */}
                <Switch>
                    <Route exact path="/">
                        <HomePage recipes={recipes} />
                    </Route>

                    <Route path="/recipe/:id">
                        <RecipeDetailsPage />
                    </Route>

                    <Route path="/create">
                        <CreateEditRecipePage />
                    </Route>

                    <Route path="/edit/:id">
                        <CreateEditRecipePage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
