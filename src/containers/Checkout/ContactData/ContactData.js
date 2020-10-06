import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const contactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      errMsg: "Please enter a valid Name",
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      errMsg: "Please enter a valid Street Name",
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
      errMsg: "Please enter a valid Zip Code",
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      validation: {
        required: true,
      },
      value: "",
      valid: false,
      errMsg: "Please enter a valid Country",
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      errMsg: "Please enter a valid Email",
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: true,
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let key in orderForm) {
      formData[key] = orderForm[key].value;
    }

    const orderPayload = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(orderPayload, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const formEl = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: formEl,
    });

    let isFormValid = true;
    for (let key in updatedOrderForm) {
      isFormValid = updatedOrderForm[key].valid && isFormValid;
    }

    setOrderForm(updatedOrderForm);
    setIsFormValid(isFormValid);
  };

  let formElArray = [];

  for (let key in orderForm) {
    formElArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElArray.map((el) => {
        return (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
            errMsg={el.config.errMsg}
            changed={(event) => inputChangedHandler(event, el.id)}
          />
        );
      })}
      <Button btnType="Success" clicked={orderHandler} disabled={!isFormValid}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Details</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));
