import React, { Component } from 'react';
import './ProductsPage.css';
import ListingComponent from '../ListingComponent/ListingComponent';
import { SelectButton } from 'primereact/selectbutton';
import { ProductFilters, ListItemTypes } from '../../utility/constants';

export const ProductsPage = () => {
  const [state, setState] = React.useState({
    productsOffered: [], //product array goes here
    primaryProductFilterValue: '', //product type string goes here
  });

  const handlePrimaryFilterChange = e => {
    setState({ primaryProductFilterValue: e.value });
  };

  return (
    <div className="productsPage">
      <span className="filtersRow">
        <SelectButton
          value={state.primaryProductFilterValue}
          options={ProductFilters}
          onChange={e => handlePrimaryFilterChange(e)}
        ></SelectButton>
      </span>
      <span className="itemCarousel">
        <div className="grid">
          {state.productsOffered
            .filter(
              listItem =>
                listItem.productType === state.primaryProductFilterValue,
            )
            .map(listItem => (
              <div className="col-3">
                <ListingComponent
                  listItem={listItem}
                  type={ListItemTypes.Product}
                />
              </div>
            ))}
        </div>
      </span>
    </div>
  );
};

export default ProductsPage;
