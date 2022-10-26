import React from 'react';
import Home from '../containers/Home/Home';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from '../utility/constants';

export default () => {
  return (
    <Switch>
      <Route exact path={routes.ROOT} component={Home} />
      <Route exact path={routes.HOME} component={Home} />
      <Route exact path="*" component={() => <Redirect to={routes.ROOT} />} />
    </Switch>
  );
};
