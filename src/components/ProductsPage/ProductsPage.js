import React, { useEffect, useState } from 'react';
import './ProductsPage.css';
import ListingComponent from '../ListingComponent/ListingComponent';
import { SelectButton } from 'primereact/selectbutton';
import { ProductFilters, ListItemTypes } from '../../utility/constants';
import useStore from 'store/AuthState';
import { useCart } from 'react-use-cart';
import { toastMsg } from 'utility/utility';
import { routes } from 'utility/constants';
import { useHistory } from 'react-router';
import storage from 'utility/storage';

export const ProductsPage = () => {
  const store = useStore();
  const history = useHistory();
  const [filterValue, setFilterValue] = useState('Paint');
  const [productsOffered, setProductsOffered] = useState([]);

  const { addItem } = useCart();

  const addToCart = val => {
    addItem(val);
    toastMsg('Added to Cart', false);
  };

  const handlePrimaryFilterChange = e => {
    setFilterValue(e.value);
  };

  useEffect(() => {
    if (filterValue === 'Paint') {
      store.getProducts(1);
    } else if (filterValue === 'Heating, Cooling & Air Quality') {
      store.getProducts(2);
    } else if (filterValue === 'Garage & Storage') {
      store.getProducts(3);
    } else if (filterValue === 'Home Safety') {
      store.getProducts(4);
    } else if (filterValue === 'Kitchen Renovation') {
      store.getProducts(5);
    } else if (filterValue === 'Wall Stickers & Coverings') {
      store.getProducts(6);
    }
  }, [filterValue]);

  useEffect(() => {
    setProductsOffered(store.productsData);
  }, [store.productsData]);

  return (
    <div className="productsPage">
      <span className="filtersRow">
        <SelectButton
          value={filterValue}
          options={ProductFilters}
          onChange={e => handlePrimaryFilterChange(e)}
        ></SelectButton>
      </span>
      <span className="itemCarousel">
        <div className="grid">
          {productsOffered && productsOffered.length > 0
            ? productsOffered.slice(0, 50).map(listItem => {
                return (
                  <div
                    className="col-3"
                    style={{ 'min-height': '500px' }}
                    key={listItem.id}
                  >
                    <ListingComponent
                      listItem={listItem}
                      addToCart={addToCart}
                      type={ListItemTypes.Product}
                      handleClick={() => {
                        storage.set('productDetail', {
                          itemType: 'Product',
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

export default ProductsPage;
