import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const err = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const dispatch = useDispatch();
  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirect(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (updatedIngredients) => {
    const ingredients = updatedIngredients;
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((acc, val) => {
        return acc + val;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    // const qParams = [];
    // for (let i in this.state.ingredients) {
    //   qParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // qParams.push("price=" + this.state.totalPrice);

    // const queryString = qParams.join("&");
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfoObj = {
    ...ings,
  };
  for (let key in disabledInfoObj) {
    disabledInfoObj[key] = disabledInfoObj[key] <= 0;
  }

  let orderSummary = null;

  let burger = err ? <p>Unable to load ingredients!</p> : <Spinner />;

  if (ings) {
    burger = (
      <React.Fragment>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabledInfo={disabledInfoObj}
          purchaseable={updatePurchaseState(ings)}
          price={price}
          isAuth={isAuthenticated}
          ordered={purchaseHandler}
        />
      </React.Fragment>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCanclled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalCosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};


export default withErrorHandler(burgerBuilder, axios);

// addIngredientHandler = (type) => {
//   const updatedCount = this.state.ingredients[type] + 1;

//   const updatedIngredients = { ...this.state.ingredients };
//   updatedIngredients[type] = updatedCount;

//   const priceAddition = INGREDIENT_PRICES[type];
//   const newPrice = this.state.totalPrice + priceAddition;

//   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
//   this.updatePurchaseState(updatedIngredients);
// };

// removeIngredientHandler = (type) => {
//   const currentCount = this.state.ingredients[type];

//   if (currentCount <= 0) {
//     return;
//   }

//   const updatedIngredients = { ...this.state.ingredients };
//   updatedIngredients[type] = currentCount - 1;

//   const currentPrice = this.state.totalPrice;
//   const updatedPrice = currentPrice - INGREDIENT_PRICES[type];

//   this.setState({
//     ingredients: updatedIngredients,
//     totalPrice: updatedPrice,
//   });
//   this.updatePurchaseState(updatedIngredients);
// };
