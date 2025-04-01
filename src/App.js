import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";
import Navbar from "./Navbar";
import Categories from "./Categories";
import HeroSection from "./HeroSection";
const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
 
  
  const [isLoading, setIsLoading] = useState(false);
  const [ query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  //Function to search for the recipes
  const searchRecipes = async () => {
      setIsLoading(true);
      const url = searchApi + query;
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.meals);
      setIsLoading(false);
  };

  useEffect(() => {
    searchRecipes()
  }, []);

  return (
    <div className="Container">
      {/*<SideMenu/>*/}
      <Navbar />
      <HeroSection/>
      

      <Categories/>
      <div className="recipes">
        
        {recipes ? recipes.map(recipe => (
          <RecipeCard
             key={recipe.idMeal}
             recipe={recipe}
          />
        )) : "No Result"}
      </div>
    </div>
  );
}

export default App;

