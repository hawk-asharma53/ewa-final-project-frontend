/* eslint-disable import/no-anonymous-default-export */
import AboutUs from 'components/AboutUs/AboutUs';
import Cart from 'components/Cart/Cart';
import { Login } from 'components/Login/Login';
import ProductsPage from 'components/ProductsPage/ProductsPage';
import ServicesPage from 'components/ServicesPage/ServicesPage';
import Signup from 'components/Signup/Signup';
import StoreLocationPage from 'components/StoreLocationPage/StoreLocationPage';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import { routes } from '../utility/constants';

export default () => {
  return (
    <Switch>
      <Route exact path={routes.ROOT} component={HomePage} />
      <Route exact path={routes.LOGIN} component={Login} />

      <Route exact path={routes.SIGNUP} component={Signup} />
      <Route exact path={routes.CART} component={Cart} />
      <Route exact path={routes.ABOUT} component={AboutUs} />
      <Route exact path={routes.PRODUCTS} component={ProductsPage} />
      <Route exact path={routes.SERVICES} component={ServicesPage} />
      <Route exact path={routes.MAP} component={StoreLocationPage} />
      <Route exact path="*" component={() => <Redirect to={routes.ROOT} />} />
    </Switch>
  );
};
