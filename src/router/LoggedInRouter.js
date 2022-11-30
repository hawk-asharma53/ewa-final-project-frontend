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
import Cart from 'components/Cart/Cart';
import { ManageProductsPage } from 'components/ManageProducts/ManageProducts';
import { ManageServicesPage } from 'components/ManageServices/ManageService';
import { OrdersPage } from 'components/OrdersPage/OrdersPage';
import { ProductDetailsPage } from 'components/ProductDetailsPage/ProductDetailsPage';
import { WriteReviewPage } from 'components/WriteReviewPage/WriteReviewPage';
import MyAccountPage from 'components/MyAccountPage/MyAccountPage';

export default () => {
  return (
    <Switch>
      <Route exact path={routes.ROOT} component={HomePage} />
      <Route exact path={routes.PRODUCTS} component={ProductsPage} />
      <Route exact path={routes.SERVICES} component={ServicesPage} />
      <Route exact path={routes.CART} component={Cart} />
      <Route exact path={routes.ABOUT} component={HomePage} />
      <Route exact path={routes.CHECKOUT} component={CheckoutPage} />
      <Route exact path={routes.DASHBOARD} component={Dashboard} />
      <Route exact path={routes.MAP} component={StoreLocationPage} />
      <Route exact path={routes.WRITE_REVIEW} component={WriteReviewPage} />
      <Route
        exact
        path={routes.PRODUCT_DETAILS}
        component={ProductDetailsPage}
      />
      <Route
        exact
        path={routes.MANAGE_PRODUCTS}
        component={ManageProductsPage}
      />
      <Route
        exact
        path={routes.MANAGE_SERVICES}
        component={ManageServicesPage}
      />
      <Route exact path={routes.ORDERS} component={OrdersPage} />
      <Route exact path={routes.MYACCOUNT} component={MyAccountPage} />
      <Route exact path="*" component={() => <Redirect to={routes.ROOT} />} />
    </Switch>
  );
};
