import React from 'react';
import Oux from 'hoc/Oux/Oux';
import './homepage.css';

const HomePage = () => {
  return (
    <Oux>
      <div class="s01">
        <form>
          <fieldset>
            <legend>Search</legend>
          </fieldset>
          <div class="inner-form">
            <div class="input-field first-wrap">
              <input
                id="search"
                type="text"
                placeholder="What are you looking for?"
              />
            </div>
            <div class="input-field second-wrap">
              <input id="location" type="text" placeholder="location" />
            </div>
            <div class="input-field third-wrap">
              <button class="btn-search" type="button">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </Oux>
  );
};

export default HomePage;
