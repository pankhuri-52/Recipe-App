import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  //get the keys
   const APP_ID = "dd12db1d";
   const APP_KEY = "6bae481969a0cc1cc84decc54f1dacc6";

   const [recipes, setRecipes] = useState([]);
   const [search, setSearch] = useState("");

   //useEffect takes an arrow function
   useEffect(() => {
     getRecipes();
   },[]); // the empty array as the second argument makes this function run only once when our page renders
          // if we supply value in the array, the useEffect will run when the value in the array changes.


  const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
       // whatever is after the q (that is query) is what we are searching for
      const data = await response.json(); // awaits does the work of promises
      setRecipes(data.hits);
      console.log(data.hits);
  }

  const UpdateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text" value={search} onChange={UpdateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
       </form>
        {recipes.map((recipe) => (
            <Recipe key={recipe.recipe.label} 
                    title={recipe.recipe.label} 
                    calories={recipe.recipe.calories} 
                    image={recipe.recipe.image}
            />
        ))}
    </div>
  );
}

export default App;
