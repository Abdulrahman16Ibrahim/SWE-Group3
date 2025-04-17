import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";
import Navbar from "./Navbar";
import Categories from "./Categories";
import HeroSection from "./HeroSection";
import SuggestedRecipes from './SuggestedRecipes';
import SignUp from './SignUp';
import LogIn from './LogIn'; // Import LogIn component
import RecipeDetail from './RecipeDetail';  // Import RecipeDetail component
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const searchApi = "http://localhost:5000/api/recipes?search=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  // Function to search for recipes
  const searchRecipes = async () => {
    setIsLoading(true);
    const url = searchApi + query;
    try {
      const res = await fetch(url);
      const data = await res.json();
      // Use data.data based on your API response structure.
      setRecipes(data.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  return (
    <Router>
      <div className="Container">
        <Switch>
          {/* Sign Up Route */}
          <Route exact path="/">
            <SignUp />
          </Route>
          {/* Log In Route */}
          <Route path="/login">
            <LogIn />
          </Route>
          {/* Recipes List Page */}
          <Route exact path="/recipes">
            <Navbar />
            <HeroSection />
            <Categories />
            <SuggestedRecipes />
            <div className="recipes">
              {recipes && recipes.length > 0 ? (
                recipes.map(recipe => (
                  <RecipeCard key={recipe.recipe_id} recipe={recipe} />
                ))
              ) : (
                "No Result"
              )}
            </div>
          </Route>
          {/* Dynamic Recipe Detail Page */}
          <Route path="/recipes/:id" component={RecipeDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
