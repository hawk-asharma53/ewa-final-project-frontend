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

const center = {
  lng: -87.623177,
  lat: 41.881832,
};

const StoreLocationPage = () => {
  const [inputVal, setInputVal] = useState('');
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  let store = useStore();
  useEffect(() => {
    store.getStores();
  }, []);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }

  return (
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
          {store.storesData &&
            store.storesData
              .filter(x => (inputVal ? x.address.includes(inputVal) : x))
              .map(e => {
                return (
                  <div className="col-12" key={e.id}>
                    <Card
                      title={e.address}
                      footer={<Button label="View Store" />}
                    >
                      {'0.5 miles from you'}
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
            {/* Child components, such as markers, info windows, etc. */}
            <></>
            {store.storesData &&
              store.storesData
                .filter(x => (inputVal ? x.address.includes(inputVal) : x))
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
  );
};

export default StoreLocationPage;
