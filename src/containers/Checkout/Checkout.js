import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const checkout = (props) => {
  const onCheckoutContinued = () => {
    props.history.replace("/checkout/contact-data");
  };

  const onCheckoutCancelled = () => {
    props.history.goBack();
  };

  let summary = <Redirect to="/" />;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          onCheckoutContinued={onCheckoutContinued}
          onCheckoutCancelled={onCheckoutCancelled}
          ingredients={props.ings}
        />
        <Route
          path={`${props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(checkout);

// componentWillMount() {
//   const qParams = new URLSearchParams(this.props.location.search);
//   const ingredients = {};
//   let price = 0;
//   for (let param of qParams.entries()) {
//     if (param[0] === "price") {
//       price = param[1];
//     } else {
//       ingredients[param[0]] = +param[1];
//     }
//   }
//   this.setState({ ingredients: ingredients, totalPrice: price });
// }

// render={(props) => {
//   return (
//     <ContactData
//       ingredients={this.props.ings}
//       price={this.props.price}
//       {...props}
//     />
//   );
// }}
