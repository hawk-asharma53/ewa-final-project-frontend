import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'utility/constants';
import './login.css';

export const Login = () => {
  return (
    <div className="login">
      <form className="formClass">
        <div class="rowLogin">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            autocomplete="off"
            placeholder="email@example.com"
          />
        </div>
        <div class="rowLogin">
          <label for="password">Password</label>
          <input type="password" name="password" />
        </div>
        <button className="buttonClass" type="submit">
          Login
        </button>
        <Link className="alignLinkCenter" to={routes.SIGNUP}>
          New User?
        </Link>
      </form>
    </div>
  );
};
