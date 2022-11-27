import React, { useEffect, useState } from 'react';
import './ProductsPage.css';
import ListingComponent from '../ListingComponent/ListingComponent';
import { SelectButton } from 'primereact/selectbutton';
import { ProductFilters, ListItemTypes } from '../../utility/constants';
import useStore from 'store/AuthState';

export const ProductsPage = () => {
  const [state, setState] = useState({
    productsOffered: [], //product array goes here
    primaryProductFilterValue: 'Paint', //product type string goes here
  });

  const handlePrimaryFilterChange = e => {
    setState({ primaryProductFilterValue: e.value });
  };
  let store = useStore();

  useEffect(() => {
    if (state.primaryProductFilterValue === 'Paint') {
      store.getProducts(1);
    } else if (
      state.primaryProductFilterValue === 'Heating, Cooling & Air Quality'
    ) {
      store.getProducts(2);
    } else if (state.primaryProductFilterValue === 'Garage & Storage') {
      store.getProducts(3);
    } else if (state.primaryProductFilterValue === 'Home Safety') {
      store.getProducts(4);
    } else if (state.primaryProductFilterValue === 'Kitchen Renovation') {
      store.getProducts(5);
    } else if (
      state.primaryProductFilterValue === 'Wall Stickers & Coverings'
    ) {
      store.getProducts(6);
    }
  }, [state.primaryProductFilterValue]);

  useEffect(() => {
    setState({ productsOffered: store.productsData });
  }, [store.productsData]);

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
          {state.productsOffered && state.productsOffered.length > 0
            ? state.productsOffered.slice(0, 50).map(listItem => {
                return (
                  <div className="col-3" key={listItem.id}>
                    <ListingComponent
                      listItem={listItem}
                      type={ListItemTypes.Product}
                    />
                  </div>
                );
              })
            : ''}
        </div>
      </span>
    </div>
  );
};

export default ProductsPage;
