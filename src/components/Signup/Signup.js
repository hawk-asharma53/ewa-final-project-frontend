import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'utility/constants';
import '../Login/login.css';

const Signup = () => {
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
        <div class="rowLogin">
          <label for="password">Re-enter Password</label>
          <input type="password" name="password" />
        </div>
        <button className="buttonClass" type="submit">
          Signup
        </button>
        <Link className="alignLinkCenter" to={routes.LOGIN}>
          Back to Login?
        </Link>
      </form>
    </div>
  );
};

export default Signup;
