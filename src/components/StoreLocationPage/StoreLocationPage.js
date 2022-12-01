import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import useStore from 'store/AuthState';
const containerStyle = {
  width: '100%',
  height: '800px',
};

const center = { lat: 41.88205, lng: -87.627826 };

const StoreLocationPage = () => {
  const [inputVal, setInputVal] = useState('');
  const [coords, setCoords] = useState({ lat: 41.88205, lng: -87.627826 });
  const [storesData, setStoresData] = useState([]);
  const store = useStore();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        store.getStoresByDistance({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      store.getStoresByDistance(coords);
    }
  }, []);

  useEffect(() => {
    setStoresData(store.storesData);
  }, [store.storesData]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="mt-4 mb-4">Stores Near Me</h3>
      <div className="flex flex-row mt-4">
        <div
          className="w-4 ml-4 pr-4"
          style={{ height: '800px', overflowY: 'scroll' }}
        >
          <div className="grid">
            <div className="col-12">
              <span className="p-input-icon-left w-12">
                <i className="pi pi-search" />
                <InputText
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="Search"
                  className="w-12"
                />
              </span>
            </div>
            {storesData
              ?.filter(x =>
                inputVal
                  ? x.address.toLowerCase().includes(inputVal.toLowerCase())
                  : x,
              )
              .map(e => {
                return (
                  <div className="col-12" key={e.id}>
                    <Card title={e.address}>
                      {e.distance.text + 'les from you'}
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-8">
          <LoadScript googleMapsApiKey="AIzaSyAa8YU1gpiT8VkYF_Fp96N1WsX5ZtkXhAQ">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              {storesData
                ?.filter(x =>
                  inputVal
                    ? x.address.toLowerCase().includes(inputVal.toLowerCase())
                    : x,
                )
                .map(e => {
                  return (
                    <Marker
                      key={e.id}
                      position={{
                        lat: parseFloat(e.lat),
                        lng: parseFloat(e.lng),
                      }}
                    />
                  );
                })}
              {coords.lat && coords.lng && (
                <InfoWindow position={{ lat: coords.lat, lng: coords.lng }}>
                  <div>You are here</div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default StoreLocationPage;
