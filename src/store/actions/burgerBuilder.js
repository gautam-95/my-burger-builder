import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (payload) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: payload,
  };
};

export const removeIngredient = (payload) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: payload,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((res) => {
        dispatch(setIngredients(res.data))
      })
      .catch((err) => {
        dispatch(fetchIngredientsFailed())
      });
  };
};
