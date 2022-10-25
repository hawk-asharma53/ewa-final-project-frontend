import React from 'react';
import { withRouter } from 'react-router-dom';
import Loader from 'components/UI/loader/Loader';
//layout components
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

const Layout = props => {
  return (
    <div id="wrap" className="logSignup_wrap">
      <Loader />
      <Header {...props} />
      {props.children}
      <Footer {...props} />
    </div>
  );
};

export default withRouter(Layout);
