/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import ProductsPage from '../components/ProductsPage/ProductsPage';
import ServicesPage from '../components/ServicesPage/ServicesPage';
import CheckoutPage from '../components/CheckoutPage/CheckoutPage';
import Dashboard from 'components/Dashboard/Dashboard';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from '../utility/constants';
import HomePage from 'components/HomePage/HomePage';
import StoreLocationPage from 'components/StoreLocationPage/StoreLocationPage';

export default () => {
  return (
    <Switch>
      <Route exact path={routes.ROOT} component={Dashboard} />
      <Route exact path={routes.PRODUCTS} component={ProductsPage} />
      <Route exact path={routes.SERVICES} component={ServicesPage} />
      <Route exact path={routes.ABOUT} component={HomePage} />
      <Route exact path={routes.CHECKOUT} component={CheckoutPage} />
      <Route exact path={routes.DASHBOARD} component={Dashboard} />
      <Route exact path={routes.MAP} component={StoreLocationPage} />
      <Route exact path="*" component={() => <Redirect to={routes.ROOT} />} />
    </Switch>
  );
};
