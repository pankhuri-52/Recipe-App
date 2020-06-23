import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  //get the keys
   const APP_ID = "dd12db1d";
   const APP_KEY = "6bae481969a0cc1cc84decc54f1dacc6";

   const [recipes, setRecipes] = useState([]);
   const [search, setSearch] = useState("");
   const [query, setQuery] = useState('chicken'); // this state is changed when we finally click button after writing query

   const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
     // whatever is after the q (that is query) is what we are searching for
    const data = await response.json(); // awaits does the work of promises
    setRecipes(data.hits);
    console.log(data.hits);
   }

   //useEffect takes an arrow function
   useEffect(() => {
     // eslint-disable-next-line
     getRecipes();
   },[query]); // the empty array as the second argument makes this function run only once when our page renders
          // if we supply value in the array, the useEffect will run when the value in the array changes.

  const UpdateSearch = e => {
    setSearch(e.target.value);
  }

  //get Search runs when the form submits
  const getSearch = e => {
     e.preventDefault(); // stopping the page refresh
     setQuery(search);
     setSearch('');
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={UpdateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
       </form>
        <div className="recipes">
        {recipes.map((recipe) => (
            <Recipe key={recipe.recipe.label} 
                    title={recipe.recipe.label} 
                    calories={recipe.recipe.calories} 
                    image={recipe.recipe.image}
                    ingredients={recipe.recipe.ingredients}
            />
        ))}
       </div>
    </div>
  );
}

export default App;
