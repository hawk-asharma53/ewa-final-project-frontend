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
import { ListItemTypes } from '../../utility/constants';

const HomePage = () => {
  const store = useStore();
  const history = useHistory();
  const [servicesOffered, setServicesOffered] = useState([]);
  const [productsOffered, setProductsOffered] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [suggestedServies, setSuggestedServices] = useState([]);
  const [mostSoldServices, setMostSoldServices] = useState([]);
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [popularNearYou, setPopuplarNearYou] = useState([]);
  const [boughtNearYou, setBoughtNearYou] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [storesData, setStoresData] = useState([]);

  useEffect(() => {
    store.getAllProducts();
    store.getAllServices();
    store.mostSoldProducts();
    store.mostSoldServices();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        store.popularNearYou(coords);
        store.getStoresByDistance(coords);
      });
    } else {
      const coords = { lat: 41.88205, lng: -87.627826 };
      store.popularNearYou(coords);
      store.getStoresByDistance(coords);
    }
  }, []);

  useEffect(() => {
    setProductsOffered(store.productsData);
  }, [store.productsData]);

  useEffect(() => {
    setServicesOffered(store.serviceData);
  }, [store.serviceData]);

  useEffect(() => {
    setMostSoldServices(store.mostSoldServicesData);
  }, [store.mostSoldServicesData]);

  useEffect(() => {
    setBoughtNearYou(store.boughtNearYouData);
  }, [store.boughtNearYouData]);

  useEffect(() => {
    setMostSoldProducts(store.mostSoldProductsData);
  }, [store.mostSoldProductsData]);

  useEffect(() => {
    setPopuplarNearYou(store.popularNearYouData);
  }, [store.popularNearYouData]);

  useEffect(() => {
    setStoresData(store.storesData);
    const zipcode =
      store.storesData && store.storesData.length > 0
        ? store.storesData[0].zipcode
        : 60616;
    store.boughtNearYou(zipcode);
  }, [store.storesData]);

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
          <h5 className="mb-4">Search For Products</h5>
          <AutoComplete
            value={selectedProduct}
            placeholder="Enter a Product"
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
            placeholder="Enter a Service"
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
      {mostSoldServices.length > 0 ? (
        <div className="grid mx-8 mt-4">
          <div className="col-12 p-0">
            <h1>Most Sold Services</h1>
          </div>
          {mostSoldServices &&
            mostSoldServices.map(listItem => (
              <div className="col-3">
                <ListingComponent
                  listItem={listItem}
                  type={ListItemTypes.Service}
                />
              </div>
            ))}
          <div></div>
        </div>
      ) : (
        ''
      )}
      {mostSoldProducts.length > 0 ? (
        <div className="grid mx-8 mt-4">
          <div className="col-12 p-0">
            <h1>Most Sold Products</h1>
          </div>
          {mostSoldProducts &&
            mostSoldProducts.map(listItem => (
              <div className="col-3">
                <ListingComponent
                  listItem={listItem}
                  type={ListItemTypes.Product}
                />
              </div>
            ))}
          <div></div>
        </div>
      ) : (
        ''
      )}
      {popularNearYou.length > 0 ? (
        <div className="grid mx-8 mt-4">
          <div className="col-12 p-0">
            <h1>Popular near you</h1>
          </div>
          {popularNearYou &&
            popularNearYou.map(listItem => (
              <div className="col-3">
                <ListingComponent
                  listItem={listItem}
                  type={ListItemTypes.Product}
                />
              </div>
            ))}
        </div>
      ) : (
        ''
      )}
      {boughtNearYou.length > 0 ? (
        <div className="grid mx-8 mt-4">
          <div className="col-12 p-0">
            <h1>Bought Near You</h1>
          </div>
          {boughtNearYou &&
            boughtNearYou.map(listItem => (
              <div className="col-3">
                <ListingComponent
                  listItem={listItem}
                  type={ListItemTypes.Product}
                />
              </div>
            ))}
        </div>
      ) : (
        ''
      )}
    </Oux>
  );
};

export default HomePage;
