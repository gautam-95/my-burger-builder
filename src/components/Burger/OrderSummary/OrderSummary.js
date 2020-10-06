import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ing) => {
    return (
      <li key={ing}>
        <span style={{ textTransform: "capitalize" }}>{ing}</span> :{" "}
        {props.ingredients[ing]}
      </li>
    );
  });

  return (
    <Aux>
      <h3> Your Order</h3>
      <p>A delicious Burger with following Ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanclled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
