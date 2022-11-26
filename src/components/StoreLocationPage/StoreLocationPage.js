import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
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
  let store = useStore();
  useEffect(() => {
    store.getStores();
  }, []);

  return (
    <div className="flex flex-row mt-4">
      <div className="w-4 ml-4 pr-4" style={{ height: '800px' }}>
        <div className="grid">
          <div className="col-12">
            <span className="p-input-icon-left w-12">
              <i className="pi pi-search w-12" />
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
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default StoreLocationPage;
