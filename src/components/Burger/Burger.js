import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  // Construct array from the ingredients object
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ing) => {
      return [...Array(props.ingredients[ing])].map((_, i) => {
        return <BurgerIngredient key={ing + i} type={ing} />;
      });
    }) // Flatten the array
    .reduce((acc, val) => {
      return acc.concat(val);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p> Please start adding ingredients! </p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
