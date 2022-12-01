import React from 'react';
import Oux from 'hoc/Oux/Oux';
import './homepage.css';
import ListingComponent from '../ListingComponent/ListingComponent';
import { AutoComplete } from 'primereact/autocomplete';
import useStore from 'store/AuthState';
import { useState } from 'react';
import { useEffect } from 'react';
import { routes } from 'utility/constants';
import { useHistory } from 'react-router';
import storage from 'utility/storage';

const HomePage = () => {
  const store = useStore();
  const history = useHistory();
  const [servicesOffered, setServicesOffered] = useState([]);
  const [productsOffered, setProductsOffered] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [suggestedServies, setSuggestedServices] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    store.getAllProducts();
    store.getAllServices();
  }, []);

  useEffect(() => {
    setProductsOffered(store.productsData);
  }, [store.productsData]);

  useEffect(() => {
    setServicesOffered(store.serviceData);
  }, [store.serviceData]);

  const searchProducts = e => {
    setSuggestedProducts(
      productsOffered.filter(
        product =>
          product.title.includes(e.query) ||
          product.subcategory.toLowerCase().includes(e.query.toLowerCase()),
      ),
    );
  };

  const searchServices = e => {
    setSuggestedServices(
      servicesOffered.filter(service =>
        service.title.toLowerCase().includes(e.query.toLowerCase()),
      ),
    );
  };

  const itemTemplate = item => {
    return <span>{item.title}</span>;
  };

  return (
    <Oux>
      <div className="d-flex w-100 justify-content-evenly p-6">
        <div className="d-flex flex-column w-25">
          <h5 className="mb-4">Serach For Products</h5>
          <AutoComplete
            value={selectedProduct}
            suggestions={suggestedProducts}
            completeMethod={searchProducts}
            itemTemplate={itemTemplate}
            onChange={e => {
              if (e.value instanceof Object) {
                setSelectedProduct(e.value.title);
                storage.set('productDetail', {
                  itemType: 'Product',
                  itemDetail: e.value,
                });
                history.push(routes.PRODUCT_DETAILS);
              } else {
                setSelectedProduct(e.value);
              }
            }}
          />
        </div>
        <div className="d-flex flex-column w-25">
          <h5 className="mb-4">Search for Services</h5>
          <AutoComplete
            value={selectedService}
            suggestions={suggestedServies}
            completeMethod={searchServices}
            itemTemplate={itemTemplate}
            onChange={e => {
              if (e.value instanceof Object) {
                setSelectedService(e.value.title);
                storage.set('productDetail', {
                  itemType: 'Service',
                  itemDetail: e.value,
                });
                history.push(routes.PRODUCT_DETAILS);
              } else {
                setSelectedService(e.value);
              }
            }}
          />
        </div>
      </div>
      <div className="grid mx-8 mt-4">
        <div className="col-12 p-0">
          <h1>Trending</h1>
        </div>
        {/* {productsOffered && productsOffered.length > 0 ? (
          productsOffered.map(listItem => (
            <div className="col-3">
              <ListingComponent
                listItem={listItem}
                type={ListItemTypes.Product}
              />
            </div>
          ))
        ) : (
          <div>
            <ProgressSpinner />
          </div>
        )} */}
        <div></div>
      </div>
      <div className="grid mx-8 mt-4">
        <div className="col-12 p-0">
          <h1>Most bought</h1>
        </div>
        {/* {productsOffered && productsOffered.length > 0 ? (
          productsOffered.map(listItem => (
            <div className="col-3">
              <ListingComponent
                listItem={listItem}
                type={ListItemTypes.Product}
              />
            </div>
          ))
        ) : (
          <div>
            <ProgressSpinner />
          </div>
        )} */}
        <div></div>
      </div>
      <div className="grid mx-8 mt-4">
        <div className="col-12 p-0">
          <h1>Popular near you</h1>
        </div>
        {/* {productsOffered && productsOffered.length > 0 ? (
          productsOffered.map(listItem => (
            <div className="col-3">
              <ListingComponent
                listItem={listItem}
                type={ListItemTypes.Product}
              />
            </div>
          ))
        ) : (
          <div>
            <ProgressSpinner />
          </div>
        )} */}
        <div></div>
      </div>
    </Oux>
  );
};

export default HomePage;
