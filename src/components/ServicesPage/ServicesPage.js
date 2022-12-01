import React, { useEffect, useState } from 'react';
import './ServicesPage.css';
import ListingComponent from '../ListingComponent/ListingComponent';
import { SelectButton } from 'primereact/selectbutton';
import { ServiceFilters, ListItemTypes } from '../../utility/constants';
import useStore from 'store/AuthState';
import { useCart } from 'react-use-cart';
import { toastMsg } from 'utility/utility';
import { routes } from 'utility/constants';
import { useHistory } from 'react-router';
import storage from 'utility/storage';

export const ServicesPage = () => {
  const store = useStore();
  const history = useHistory();
  const [filterValue, setFilterValue] = useState('Handyman');
  const [servicesOffered, setServicesOffered] = useState([]);

  const { addItem } = useCart();

  const addToCart = val => {
    addItem(val);
    toastMsg('Added to Cart', false);
  };

  const handlePrimaryFilterChange = e => {
    setFilterValue(e.value);
  };

  useEffect(() => {
    if (filterValue === 'Handyman') {
      store.getServices(9);
    } else if (filterValue === 'Moving') {
      store.getServices(10);
    } else if (filterValue === 'Furniture Assembly') {
      store.getServices(11);
    } else if (filterValue === 'Mounting & Installation') {
      store.getServices(12);
    } else if (filterValue === 'Cleaning') {
      store.getServices(13);
    } else if (filterValue === 'Yardwork Services') {
      store.getServices(14);
    }
  }, [filterValue]);

  useEffect(() => {
    setServicesOffered(store.serviceData);
  }, [store.serviceData]);

  return (
    <div className="productsPage">
      <span className="filtersRow">
        <SelectButton
          value={filterValue}
          options={ServiceFilters}
          onChange={e => handlePrimaryFilterChange(e)}
        ></SelectButton>
      </span>
      <span className="itemCarousel">
        <div className="grid">
          {servicesOffered && servicesOffered.length > 0
            ? servicesOffered.map(listItem => {
                return (
                  <div className="col-3" key={listItem.id}>
                    <ListingComponent
                      listItem={listItem}
                      type={ListItemTypes.Service}
                      addToCart={addToCart}
                      handleClick={() => {
                        storage.set('productDetail', {
                          itemType: 'Service',
                          itemDetail: listItem,
                        });
                        history.push(routes.PRODUCT_DETAILS);
                      }}
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
