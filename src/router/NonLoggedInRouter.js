/* eslint-disable import/no-anonymous-default-export */
import { Login } from 'components/Login/Login';
import Signup from 'components/Signup/Signup';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import ProductsPage from '../components/ProductsPage/ProductsPage';
import ServicesPage from '../components/ServicesPage/ServicesPage';
import CheckoutPage from '../components/CheckoutPage/CheckoutPage';
import { routes } from '../utility/constants';

export default () => {
  return (
    <Switch>
      <Route exact path={routes.ROOT} component={HomePage} />
      <Route exact path={routes.LOGIN} component={Login} />
      <Route exact path={routes.SIGNUP} component={Signup} />
      <Route exact path={routes.PRODUCTS} component={ProductsPage} />
      <Route exact path={routes.SERVICES} component={ServicesPage} />
      <Route exact path={routes.ABOUT} component={HomePage} />
      <Route exact path={routes.CHECKOUT} component={CheckoutPage} />
      <Route exact path="*" component={() => <Redirect to={routes.ROOT} />} />
    </Switch>
  );
};
