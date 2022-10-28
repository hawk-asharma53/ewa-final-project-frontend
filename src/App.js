import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import '/node_modules/primeflex/primeflex.css';
import AppRouter from './router/router';

const App = () => {
  return (
    <Router>
      <ReactNotification />
      <AppRouter />
    </Router>
  );
};

export default App;
