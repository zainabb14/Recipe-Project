import React , { useState,useEffect } from "react";
import RecipeCard from "../../Components/RecipeCard/RecipeCard.js";
import TopRecipeCard from "../../Components/TopRecipeCard/topRecipeCard.js";
import Style from "./homepage.module.css";
// import bg from "../../assets/photos/bg.png";
import axios from 'axios';
import Hero from '../../Components/hero';
import {useNavigate} from "react-router-dom"
function Home() {
  const navigate=useNavigate()
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQueryName, setSearchQueryName] = useState("");
  const [ingredientQuery, setIngredientQuery] = useState('');
  
  
 useEffect(() => {
    axios.get("http://localhost:3000/Recipe/all-recipes").then((response) => {
      setRecipes(response.data);
      setFilteredRecipes(response.data);
    });
  }, []);

  const handleLike = async (recipeId) => {   
      try {
        await axios.post(`http://localhost:3000/Recipe/like-recipe/${recipeId}`);
        const updatedRecipes = recipes.map((recipe) => {
          if (recipe._id === recipeId) {
            const updatedRecipe = { ...recipe, likes: recipe.likes + 1};
            return updatedRecipe;
          }
          return recipe;
        });
        setFilteredRecipes(updatedRecipes);
        setRecipes(updatedRecipes);
      } catch (error) {
        console.error('Error liking recipe:', error);
      }
    }
    
  const handleUnlike= async (recipeId) => {
    try {
      await axios.post(`http://localhost:3000/Recipe/unlike-recipe/${recipeId}`);
      const updatedRecipes = recipes.map((recipe) => {
        if (recipe._id === recipeId) {
          const updatedRecipe = { ...recipe, likes: recipe.likes - 1};
          return updatedRecipe;
        }
        return recipe;
      });
      setFilteredRecipes(updatedRecipes);
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error liking recipe:', error);
    }
  }
  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    const filtered = recipes.filter((recipe) => recipe.category === selectedCategory);
    setFilteredRecipes(filtered);
  };

  const handleCountryChange = (selectedCountry) => {
    setSelectedCountry(selectedCountry);
    const filtered = recipes.filter((recipe) => recipe.Country === selectedCountry);
    setFilteredRecipes(filtered);
  };

  const handleSearchQueryName = (e)=> {
    const filtered = recipes.filter( (recipe) =>
      recipe.name.toLowerCase().includes(searchQueryName.toLowerCase()) );
    setFilteredRecipes(filtered);
  };

  const handleIngredientSearch = (e) => {
    e.preventDefault();
  
    const searchedIngredients = ingredientQuery.split(',').map((ingredient) => ingredient.trim().toLowerCase());

    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.ingredients.some((ingredient) =>
      searchedIngredients.some((searchedIngredient) =>
        ingredient.name.toLowerCase().includes(searchedIngredient)
      )
    );
});
    setFilteredRecipes(filteredRecipes);
  };
  
  const topRecipes = recipes.slice().sort((a, b) => b.likes - a.likes).slice(0, 5);

  const [isClicked, setIsClicked] = useState(false);

  const handleDropdownClick = () => {
    setIsClicked(true);    
  }
  const countryContext = require.context(
    "../../assets/Images/",
    false,
    /\.(png)$/ // Specify the file extension you want to include
  );
  const countryArray=countryContext.keys();
  const countryNames=countryArray.map((country)=>{
    return(
        country.split("/")[1].split(".")[0].split("-")[1]
    )
  })
  return (
      <div>
          {/* <div className={Style.backgroundP}>
              <img src={bg}  alt="bgPhoto" ></img>
              <p className={Style.p1}>Bringing the World to Your Table</p>
              <p className={Style.p2}>Explore a World of Culinary Delights with Food Lovers. Share Your Culinary Adventures on Our  Platform... </p>
              <div className={Style.scroll}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="#ffa101" fill-rule="evenodd" d="M14.207 1.707L13.5 1l-6 6l-6-6l-.707.707l6.353 6.354h.708l6.353-6.354zm0 6L13.5 7l-6 6l-6-6l-.707.707l6.353 6.354h.708l6.353-6.354z" clip-rule="evenodd"/></svg>
                  <p>BE YOUR OWN CHEF</p>
              </div>
          </div> */}
          <div className={Style.divhero}>
          <Hero />
          </div>
         
          
          <p className={Style.toprecipes}>TOP RECIPES</p>
          <div className={Style.divtoprecipes}>
                {topRecipes.map((recipe) => (
                 <TopRecipeCard
                   key={recipe._id}
                   recipe={recipe}
                   onClick={()=>{navigate(`/recipe/${recipe._id}`)}}
                 />
                ))}
          </div>
          <p className={Style.sharedRecipes}>Recipes shared by fellow cooks:</p>
            <div className={Style.searchContainer}>
              <textarea className={Style.txtareasearch} placeholder="what are we cooking today?..." rows="1" cols="50" style={{ resize: "none" }} value={searchQueryName} onChange={(e) => {setSearchQueryName(e.target.value);handleSearchQueryName(e)}}/>
            </div>
  <div className={Style.filters}>
    <div className={Style.Category}>
      <form>
        <select
          id="select"
          name="Category"
          title="Category"
          className={`${Style.dropdown} ${isClicked ? Style.clicked : ""}`}
          onClick={handleDropdownClick}
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={selectedCategory}
        >
          <option className={Style.options} id="category" value="Category" selected hidden >
            Category
          </option>
          <option className={Style.options} value="Lunch">
            Lunch
          </option>
          <option className={Style.options} value="Breakfast">
            Breakfast
          </option>
          <option className={Style.options} value="Dinner">
            Dinner
          </option>
          <option className={Style.options} value="Dessert">
            Dessert
          </option>
          <option className={Style.options} value="Snack">
            Snack
          </option>
          <option className={Style.options} value="Drinks">
            Drinks
          </option>
          <option className={Style.options} value="Vegan">
            Vegan
          </option>
          <option className={Style.options} value="Salad">
            Salad
          </option>
        </select>
      </form>
    </div>
    <div className={Style.Country}>
      <form>
        <select
          id="select"
          name="Country"
          title="Country"
          className={`${Style.dropdown} ${isClicked ? Style.clicked : ""}`}
          onClick={handleDropdownClick}
          onChange={(e) => handleCountryChange(e.target.value)}
          value={selectedCountry}
        >
          <option className={Style.options} value="Category" hidden>
            Country
          </option>
          {countryNames.map((country) => (
        <option className={Style.options} value={country}>
            <p>{country}</p>
        </option>
    ))}
        </select>
      </form>
    </div>
    <textarea className={Style.txtareaing} placeholder="Search for multiple ingredients separated by ‘,’" rows="1" cols="50" style={{ resize: 'none' }} value={ingredientQuery} onChange={(e) => setIngredientQuery(e.target.value)}/>
    <button className={Style.searchfilter} onClick={handleIngredientSearch} >Search</button>
    </div>
          <div className={Style.divrecipes}>
                {filteredRecipes.map((recipe) => (
                 <RecipeCard
                   key={recipe._id}
                   recipe={recipe}
                   onLike={handleLike}
                   onUnLike={handleUnlike}
                   onClick={()=>{navigate(`/recipe/${recipe._id}`)}}
                 />
                ))}
          </div>
  </div>
    
  );
};

export default Home;