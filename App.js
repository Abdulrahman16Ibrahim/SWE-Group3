import { useState, useEffect } from 'react';
import './App.css';
import RecipeCard from "./RecipeCard";
import Navbar from "./Navbar";
import Categories from "./Categories";
import HeroSection from "./HeroSection";
import SuggestedRecipes from './SuggestedRecipes';
import SignUp from './SignUp';
import LogIn from './LogIn';
import RecipeDetail from './RecipeDetail';
import MealPlanner from './MealPlanner';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const searchApi = "http://localhost:5000/api/recipes?search=";

function App() {
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async () => {
    try {
      const res = await fetch(searchApi);
      const data = await res.json();
      setRecipes(data.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    searchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="Container">
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route exact path="/recipes">
            <Navbar />
            <HeroSection />
            <Categories />
            <SuggestedRecipes />
            <div className="recipes">
              {recipes.length > 0 ? (
                recipes.map(recipe => (
                  <RecipeCard key={recipe.recipe_id} recipe={recipe} />
                ))
              ) : (
                "No Result"
              )}
            </div>
          </Route>
          <Route path="/recipes/:id" component={RecipeDetail} />
          <Route path="/meal-planner">
            <Navbar />
            <MealPlanner />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
