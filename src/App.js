import React, { useEffect, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const app = (props) => {
  const { onTruAutoSignin } = props;

  useEffect(() => {
    onTruAutoSignin();
  }, [onTruAutoSignin]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTruAutoSignin: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(app);
