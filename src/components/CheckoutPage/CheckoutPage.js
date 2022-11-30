import React, { useState, useEffect } from 'react';
import './checkoutpage.css';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { useCart } from 'react-use-cart';
import useStore from 'store/AuthState';
import { addAddress } from 'api/dataAPI';
import { useHistory } from 'react-router';

const CheckoutPage = () => {
  const [stores, setStores] = useState([]);

  const [checked, setChecked] = useState({
    pickUp: false,
    delivery: true,
  });

  let history = useHistory();
  let zstore = useStore();

  useEffect(() => {
    zstore.getStores();
  }, []);

  useEffect(() => {
    if (zstore.storesData) {
      let array = [];
      zstore.storesData.forEach(e => {
        array.push({ name: e.address, value: e.id });
      });
      setStores(array);
    }
  }, [zstore.storesData]);

  const { cartTotal, items, emptyCart } = useCart();
  const [form, setForm] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    storeId: '',
    firstName: '',
    lastName: '',
    email: '',
    creditCart: '',
    cvv: '',
    expiry: '',
  });

  const handleSubmit = values => {
    var todayDate = new Date().toISOString().slice(0, 10);
    var time = new Date().toTimeString().slice(0, 8);

    let orders = [];
    items.forEach(e => {
      orders.push(...orders, { itemId: e.id, quantity: e.quantity });
    });

    if (
      form.address1 &&
      form.address2 &&
      form.state &&
      form.city &&
      form.zipcode
    ) {
      addAddress({
        userId: zstore?.userData?.user_id,
        aptno: form.address1,
        street: form.address2,
        city: form.city,
        zipcodde: form.zipcode,
      })
        .then(function (response) {
          if (response?.data?.data) {
            let data = {
              userId: zstore?.userData?.user_id,
              storeId: form.storeId === '' ? null : form.storeId,
              status: 'Processing',
              total: cartTotal,
              paymentId: '123',
              type: checked.delivery ? 'delivery' : 'pick-up',
              orderDate: todayDate.concat(' ', time),
              address: response?.data?.data,
              orderItems: orders,
            };
            zstore.placeOrder(data, emptyCart, history);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
              <h4>Your Information</h4>
            </div>
            <div className="col-4">
              <span className="p-float-label">
                <InputText
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-12"
                />
                <label htmlFor="firstName">First Name</label>
              </span>
            </div>
            <div className="col-4">
              <span className="p-float-label w-12">
                <InputText
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-12"
                />
                <label htmlFor="lastName">Last Name</label>
              </span>
            </div>
            <div className="col-4 w-12">
              <span className="p-float-label">
                <InputText
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
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
              <h4>Billing Information</h4>
            </div>
            <div className="col-4 mb-2">
              <span className="p-float-label">
                <InputText
                  id="address1"
                  name="address1"
                  value={form.address1}
                  onChange={handleChange}
                  className="w-12"
                  required
                />
                <label htmlFor="address1">Apt #, Suite, Floor</label>
              </span>
            </div>
            <div className="col-8">
              <span className="p-float-label">
                <InputText
                  id="address2"
                  name="address2"
                  value={form.address2}
                  onChange={handleChange}
                  className="w-12"
                  required
                />
                <label htmlFor="address2">Street Address</label>
              </span>
            </div>
            <div className="col-4">
              <span className="p-float-label">
                <InputText
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-12"
                  required
                />
                <label htmlFor="city">City</label>
              </span>
            </div>
            <div className="col-4">
              <span className="p-float-label w-12">
                <InputText
                  id="state"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-12"
                  required
                />
                <label htmlFor="state">State</label>
              </span>
            </div>
            <div className="col-4 w-12">
              <span className="p-float-label">
                <InputText
                  id="zipcode"
                  name="zipcode"
                  value={form.zipcode}
                  onChange={handleChange}
                  className="w-12"
                  required
                />
                <label htmlFor="zipcode">Zipcode</label>
              </span>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="grid">
            <div className="col-12 mb-2">
              <h4>Payment Information</h4>
            </div>
            <div className="col-6 w-12">
              <span className="p-float-label">
                <InputText
                  id="creditCard"
                  name="creditCart"
                  value={form.creditCart}
                  onChange={handleChange}
                  className="w-12"
                />
                <label htmlFor="creditCard">Credit Card</label>
              </span>
            </div>
            <div className="col-3 w-12">
              <span className="p-float-label">
                <InputText
                  id="cvv"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                  className="w-12"
                />
                <label htmlFor="cvv">CVV</label>
              </span>
            </div>
            <div className="col-3 w-12">
              <span className="p-float-label">
                <InputText
                  id="expiry"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  className="w-12"
                />
                <label htmlFor="expiry">Expiry</label>
              </span>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="col-12 mb-2">
            <h4>Shipping Information</h4>
          </div>
          <div className="col-6 w-12 grid">
            <p>Pickup</p>
            <Checkbox
              onChange={e =>
                setChecked({
                  ...checked,
                  pickUp: e.checked,
                  delivery: !e.checked,
                })
              }
              checked={checked.pickUp}
            ></Checkbox>
            <p>Delivery</p>
            <Checkbox
              onChange={e =>
                setChecked({
                  ...checked,
                  delivery: e.checked,
                  pickUp: !e.checked,
                })
              }
              checked={checked.delivery}
            ></Checkbox>
          </div>
          {checked.pickUp && stores.length > 0 ? (
            <div className="grid">
              <Dropdown
                optionLabel="name"
                value={form.storeId}
                options={stores}
                onChange={e => setForm({ ...form, storeId: e.value })}
                placeholder="Select a Store"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <button
          className="buttonClass"
          onClick={() => handleSubmit()}
          type="submit"
        >
          Checkout
        </button>
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
            <div className="col-12" key={item.id}>
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
