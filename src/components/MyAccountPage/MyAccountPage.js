import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'utility/constants';
import '../Login/Login';

const MyAccountPage = () => {
  return (
    <div className="login">
      <form className="formClass" style={{ maxWidth: '1100px' }}>
        <h3 style={{ marginBottom: '25px' }}>My Account</h3>
        <label for="email">Name</label>
        <div class="rowMyAccount">
          <input
            type="text"
            name="name"
            autocomplete="off"
            placeholder="John"
          />
        </div>
        <label for="email">Email</label>
        <div class="rowMyAccount">
          <input
            type="email"
            name="email"
            autocomplete="off"
            placeholder="email@example.com"
          />
        </div>
        <label for="email">Address</label>
        <div class="rowMyAccount">
          <input
            type="email"
            name="email"
            autocomplete="off"
            placeholder="Chicago"
          />
        </div>
        <label for="password">Password</label>
        <div class="rowMyAccount">
          <input type="password" placeholder="*********" name="password" />
        </div>
        <label for="password">Confirm Password</label>
        <div class="rowMyAccount">
          <input type="password" placeholder="*********" name="password" />
        </div>
        <button className="buttonClass" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MyAccountPage;
