import React, { useState } from 'react';
import Oux from 'hoc/Oux/Oux';
import './checkoutpage.css';
import { InputText } from 'primereact/inputtext';

const CheckoutPage = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');

  return (
    <div className="grid m-8">
      <div className="col-8">
        <div className="col-12">
          <div className="grid">
						<div className='col-12 mb-2'>
							<h4>Your Informaion</h4>
						</div>
            <div className="col-4">
              <span className="p-float-label">
                <InputText
                  id="firstname"
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                  className="w-12"
                />
                <label htmlFor="firstname">First Name</label>
              </span>
            </div>
            <div className="col-4">
              <span className="p-float-label w-12">
                <InputText
                  id="lastname"
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                  className="w-12"
                />
                <label htmlFor="lastname">Last Name</label>
              </span>
            </div>
            <div className="col-4 w-12">
              <span className="p-float-label">
                <InputText
                  id="email"
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                  className="w-12"
                />
                <label htmlFor="email">Email</label>
              </span>
            </div>
          </div>
        </div>
				<div className="col-12">
          <div className="grid">
						<div className='col-12 mb-2'>
							<h4>Billing Informaion</h4>
						</div>
						<div className="col-6 mb-2">
              <span className="p-float-label">
                <InputText
                  id="address1"
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                  className="w-12"
                />
                <label htmlFor="address1">Address 1</label>
              </span>
            </div>
						<div className="col-6">
              <span className="p-float-label">
                <InputText
                  id="address2"
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                  className="w-12"
                />
                <label htmlFor="address2">Address 2</label>
              </span>
            </div>
            <div className="col-4">
              <span className="p-float-label">
                <InputText
                  id="city"
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                  className="w-12"
                />
                <label htmlFor="city">City</label>
              </span>
            </div>
            <div className="col-4">
              <span className="p-float-label w-12">
                <InputText
                  id="state"
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                  className="w-12"
                />
                <label htmlFor="state">State</label>
              </span>
            </div>
            <div className="col-4 w-12">
              <span className="p-float-label">
                <InputText
                  id="zipcode"
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                  className="w-12"
                />
                <label htmlFor="zipcode">Zipcode</label>
              </span>
            </div>
          </div>
        </div>
				<div className="col-12">
          <div className="grid">
						<div className='col-12 mb-2'>
							<h4>Payment Informaion</h4>
						</div>
          </div>
        </div>
      </div>
      <div className="col-4 summary-section">
        <div className="grid">
					<div className="col-12">
          	<h4>Summary</h4>
					</div>
          <div className="col-12">
            <div className="flex flex-row justify-content-between">
              <p>Subtotal</p>
              <p>$299</p>
            </div>
            <div className="flex flex-row justify-content-between">
              <p>Estimated Delivery</p>
              <p>$0</p>
            </div>
            <div className="flex flex-row justify-content-between">
              <p className="text-black font-semibold">Total</p>
              <p className="text-black font-semibold">$299</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
