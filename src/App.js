import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import '/node_modules/primeflex/primeflex.css';
import AppRouter from './router/router';
import { CartProvider } from 'react-use-cart';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <ReactNotification />
        <AppRouter />
      </Router>
    </CartProvider>
  );
};

export default App;
