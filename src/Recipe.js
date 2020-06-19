import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, calories, image, ingredients}) => {
    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ol>
                {ingredients.map( ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <h2>Calories : </h2>
            <p className={style.calorie}>{calories}</p>
             <img className={style.image} src={image} alt="" />
        </div>
    );
}
export default Recipe;