import React, { useEffect, useState } from 'react';
import './ServicesPage.css';
import ListingComponent from '../ListingComponent/ListingComponent';
import { SelectButton } from 'primereact/selectbutton';
import { ServiceFilters, ListItemTypes } from '../../utility/constants';
import useStore from 'store/AuthState';

export const ServicesPage = () => {
  const [state, setState] = useState({
    servicesOffered: [], //product array goes here
    primaryServiceFilterValue: 'Handyman', //product type string goes here
  });

  const handlePrimaryFilterChange = e => {
    setState({ primaryServiceFilterValue: e.value });
  };
  let store = useStore();

  useEffect(() => {
    if (state.primaryServiceFilterValue === 'Handyman') {
      store.getServices(9);
    } else if (state.primaryServiceFilterValue === 'Moving') {
      store.getServices(10);
    } else if (state.primaryServiceFilterValue === 'Furniture Assembly') {
      store.getServices(11);
    } else if (state.primaryServiceFilterValue === 'Mounting & Installation') {
      store.getServices(12);
    } else if (state.primaryServiceFilterValue === 'Cleaning') {
      store.getServices(13);
    } else if (state.primaryServiceFilterValue === 'Yardwork Services') {
      store.getServices(14);
    }
  }, [state.primaryServiceFilterValue]);

  useEffect(() => {
    setState({ servicesOffered: store.serviceData });
  }, [store.serviceData]);

  return (
    <div className="productsPage">
      <span className="filtersRow">
        <SelectButton
          value={state.primaryServiceFilterValue}
          options={ServiceFilters}
          onChange={e => handlePrimaryFilterChange(e)}
        ></SelectButton>
      </span>
      <span className="itemCarousel">
        <div className="grid">
          {state.servicesOffered && state.servicesOffered.length > 0
            ? state.servicesOffered.map(listItem => {
                return (
                  <div className="col-3" key={listItem.id}>
                    <ListingComponent
                      listItem={listItem}
                      type={ListItemTypes.Service}
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

export default ServicesPage;
