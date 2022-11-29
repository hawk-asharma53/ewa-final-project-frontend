import React from 'react';
import Oux from 'hoc/Oux/Oux';
import './homepage.css';
import ListingComponent from '../ListingComponent/ListingComponent';
import { ProductFilters, ListItemTypes } from '../../utility/constants';

const HomePage = () => {
  let plumbing = {
    productName: 'Woodworking Kit',
    provider: 'Amazon Inc.',
    price: 199.49,
  };

  let productsOffered = [plumbing, plumbing, plumbing, plumbing];
  return (
    <Oux>
      <div className="s01">
        <form>
          <fieldset>
            <legend>Search</legend>
          </fieldset>
          <div className="inner-form">
            <div className="input-field first-wrap">
              <input
                id="search"
                type="text"
                placeholder="What are you looking for?"
              />
            </div>
            <div className="input-field second-wrap">
              <input id="location" type="text" placeholder="location" />
            </div>
            <div className="input-field third-wrap">
              <button className="btn-search" type="button">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="grid mx-8 mt-4">
        <div className="col-12 p-0">
          <h1>Trending</h1>
        </div>
        {productsOffered.map(listItem => (
          <div className="col-3">
            <ListingComponent
              listItem={listItem}
              type={ListItemTypes.Product}
            />
          </div>
        ))}
        <div></div>
      </div>
      <div className="grid mx-8 mt-4">
        <div className="col-12 p-0">
          <h1>Most bought</h1>
        </div>
        {productsOffered.map(listItem => (
          <div className="col-3">
            <ListingComponent
              listItem={listItem}
              type={ListItemTypes.Product}
            />
          </div>
        ))}
        <div></div>
      </div>
      <div className="grid mx-8 mt-4">
        <div className="col-12 p-0">
          <h1>Popular near you</h1>
        </div>
        {productsOffered.map(listItem => (
          <div className="col-3">
            <ListingComponent
              listItem={listItem}
              type={ListItemTypes.Product}
            />
          </div>
        ))}
        <div></div>
      </div>
    </Oux>
  );
};

export default HomePage;
