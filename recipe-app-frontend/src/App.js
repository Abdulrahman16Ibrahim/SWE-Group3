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
import UserPreferencesForm from "./UserPreferencesForm";
import MyRecipes from './MyRecipes';
import MealPlan from "./MealPlan";
import MealPlanner   from './MealPlanner';
import MyMealPlans  from './MyMealPlans';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async () => {
    setIsLoading(true);
    const res = await fetch("http://localhost:5000/api/recipes");
    const data = await res.json();
    let list = data.data;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(r => r.recipe_name.toLowerCase().includes(q));
    }
    if (selectedCategory !== "All") {
      list = list.filter(r => r.cuisine_type === selectedCategory);
    }
    setRecipes(list);
    setIsLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  useEffect(() => {
    searchRecipes();
  }, [selectedCategory]);

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
          <Route path="/preferences">
            <UserPreferencesForm />
          </Route>
          <Route path="/myRecipes" component={MyRecipes} />
          <Route path="/mealplan" component={MealPlan} />
          <Route exact path="/recipes">
            <Navbar />
            <HeroSection
              query={query}
              onQueryChange={setQuery}
              onSearch={searchRecipes}
            />
            <Categories
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <SuggestedRecipes />
            <div className="recipes">
              {isLoading
                ? "Loading…"
                : recipes.length > 0
                ? recipes.map(r => <RecipeCard key={r.recipe_id} recipe={r} />)
                : "No Result"}
            </div>
          </Route>
          <Route path="/recipes/:id" component={RecipeDetail} />
          <Route exact path="/notFound" component={NotFound} />
          <Route path="/meal-plan" component={MealPlanner}/>
<Route path="/my-plans"  component={MyMealPlans}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
