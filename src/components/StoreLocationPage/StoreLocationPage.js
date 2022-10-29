import React, {useState} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const containerStyle = {
  width: '100%',
  height: '800px'
};

const center = {
  lng: 	-87.623177,
  lat: 41.881832
};

const Stores = [
    { name : "Store 1", address1 : "443 E 34th S" ,city : "Chicago" ,state : "Illinois" ,zipcode : "60616", lat : 41.477100, lng : -87.620087    }
]

const StoreLocationPage = () => {

    const [value3, setValue3] = useState('');

    return (
        <div className='flex flex-row mt-4'>
            <div className='w-4 ml-4 pr-4' style={{height : '800px'}}>
                <div className='grid'>
                    <div className='col-12'>
                        <span className="p-input-icon-left w-12">
                            <i className="pi pi-search w-12" />
                            <InputText value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Search" className='w-12'/>
                        </span>
                    </div>
                    <div className='col-12'>
                        <Card
                            title={"Store 1"}
                            subTitle={"443 E 34th S"}
                            footer={<Button label="View Store" />}
                        >
                            {'0.5 miles from you' }
                        </Card>
                    </div>
                    <div className='col-12'>
                        <Card
                            title={"Store 2"}
                            subTitle={"1224 S Wabash Av"}
                            footer={<Button label="View Store" />}
                        >
                            {'1.5 miles from you' }
                        </Card>
                    </div>
                    <div className='col-12'>
                        <Card
                            title={"Store 3"}
                            subTitle={"3644 S Archer Ave"}
                            footer={<Button label="View Store" />}
                        >
                            {'2.5 miles from you' }
                        </Card>
                    </div>
                </div>
            </div>
            <div className='w-8'>
                <LoadScript
                googleMapsApiKey="AIzaSyAa8YU1gpiT8VkYF_Fp96N1WsX5ZtkXhAQ"
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        { /* Child components, such as markers, info windows, etc. */ }
                        <></>
                        <Marker position={{lat : 41.477100, lng : -87.620087  }}/>
                        <Marker position={{lat : 41.866340, lng : -87.626020  }}/>
                        <Marker position={{lat : 41.827610, lng : -87.682580  }}/>
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
      )
}

export default StoreLocationPage