import React, { useState } from 'react';
import './checkoutpage.css';
import { InputText } from 'primereact/inputtext';
import { useCart } from 'react-use-cart';

const CheckoutPage = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');

  const { cartTotal, items } = useCart();

  return (
    <div className="grid mx-8 mt-4">
      <div className="col-12 mb-4">
        <div className="flex flex-row justify-content-center">
          <h1>Checkout</h1>
        </div>
      </div>
      <div className="col-8">
        <div className="col-12">
          <div className="grid">
            <div className="col-12 mb-2">
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
            <div className="col-12 mb-2">
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
            <div className="col-12 mb-2">
              <h4>Payment Informaion</h4>
            </div>
            <div className="col-6 w-12">
              <span className="p-float-label">
                <InputText
                  id="creditCard"
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                  className="w-12"
                />
                <label htmlFor="creditCard">Credit Card</label>
              </span>
            </div>
            <div className="col-3 w-12">
              <span className="p-float-label">
                <InputText
                  id="cvv"
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                  className="w-12"
                />
                <label htmlFor="cvv">CVV</label>
              </span>
            </div>
            <div className="col-3 w-12">
              <span className="p-float-label">
                <InputText
                  id="expiry"
                  value={value2}
                  onChange={e => setValue2(e.target.value)}
                  className="w-12"
                />
                <label htmlFor="expiry">Expiry</label>
              </span>
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
              <p>${cartTotal}</p>
            </div>
            <div className="flex flex-row justify-content-between">
              <p>Estimated Delivery</p>
              <p>$0</p>
            </div>
            <div className="flex flex-row justify-content-between">
              <p className="text-black font-semibold">Total</p>
              <p className="text-black font-semibold">${cartTotal}</p>
            </div>
          </div>
          <div className="col-12 seperator ml-2 mt-0"></div>
          <div className="col-12 mt-2">
            <h4>Items</h4>
          </div>
          {items.map(item => (
            <div className="col-12">
              <div>${item.price}</div>
              <p>
                {item.quantity} X {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
