import React, { useState, useEffect } from 'react';
import useStore from 'store/AuthState';
import { toastMsg } from 'utility/utility';
import { Rating } from 'primereact/rating';
import { Badge } from 'primereact/badge';
import storage from 'utility/storage';
import './OrdersPage.css';
import { Button } from 'primereact/button';

export const OrdersPage = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [storesData, setStoresData] = useState([]);
  const [addressesData, setAddressesData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isManager, setManager] = useState(false);
  const store = useStore();

  const userId = storage.get('userData', null).user_id;
  useEffect(() => {
    const isManager = store.userData?.user_type == 'manager';
    setManager(isManager);
    if (isManager) {
      const storeId = store.userData?.storeId;
      store.getOrdersStoreId(storeId);
    } else {
      store.getOrdersUserId(userId);
    }
  }, []);

  useEffect(() => {
    setOrdersData(store.userOrdersData);
  }, [store.userOrdersData]);

  useEffect(() => {
    const addressRequired = [];
    const storesRequired = [];
    const usersRequired = [];
    store.userOrdersData.map(order => {
      if (order.type === 'pick-up' && !storesRequired.includes(order.storeId)) {
        storesRequired.push(order.storeId);
      } else if (
        order.type === 'delivery' &&
        !addressRequired.includes(order.address)
      ) {
        addressRequired.push(order.address);
      }
      if (isManager && !usersRequired.includes(order.userId)) {
        usersRequired.push(order.userId);
      }
    });
    addressRequired.length > 0 &&
      store.getAddressesById(addressRequired, addressesResponse => {
        setAddressesData(addressesResponse);
      });
    storesRequired.length > 0 &&
      store.getStoresById(storesRequired, storesResponse => {
        setStoresData(storesResponse);
      });
    usersRequired.length > 0 &&
      store.getUsersById(usersRequired, usersResponse => {
        setUsersData(usersResponse);
      });
  }, [ordersData]);

  const getBadgeColorForOrderStatus = status => {
    return status === 'completed'
      ? 'success'
      : status === 'declined' || status === 'cancelled'
      ? 'danger'
      : status === 'packaging' || status === 'out for delivery'
      ? 'warning'
      : 'info';
  };

  const getStoreForPickup = storeId => {
    const storeObj = storesData?.find(store => store.id === storeId);
    if (storeObj) return storeObj.address + ', ' + storeObj.zipcode;
    return '';
  };

  const getAddressForDelivery = addressId => {
    const addressObj = addressesData?.find(address => address.id === addressId);
    if (addressObj) {
      return (
        addressObj.aptno +
        ', ' +
        addressObj.street +
        ', ' +
        addressObj.city +
        ', ' +
        addressObj.zipcodde
      );
    }
    return '';
  };

  const getUserNameForId = userId => {
    const userObj = usersData.find(user => user.user_id === userId);
    if (userObj) {
      return userObj.user_first_name + ' ' + userObj.user_last_name;
    }
    return '';
  };

  const handleOrderCancel = orderId => {
    store.updateOrderStatus(orderId, 'Cancelled');
  };

  const handleOrderStatusChange = (orderId, status) => {
    store.updateOrderStatus(orderId, status, success => {
      if (success) {
        toastMsg('Order status changed', false);
      } else {
        toastMsg('Failed to change status', true);
      }
    });
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="m-4">
        {ordersData?.length > 0
          ? 'Orders made'
          : 'No orders available to display'}
      </h2>
      {ordersData?.map(order => {
        return (
          <div key={order.id} className="order">
            {isManager && (
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Ordered by:</h5>
                <Badge
                  className="w-6"
                  value={getUserNameForId(order.userId)}
                  size="large"
                  severity="info"
                ></Badge>
              </div>
            )}
            <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
              <h5>Ordered on:</h5>
              <Badge
                className="w-3"
                value={new Date(order.orderDate).toDateString()}
                size="large"
                severity="info"
              ></Badge>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
              <h5>Current Status:</h5>
              <Badge
                className="w-3"
                value={order.status}
                size="large"
                severity={getBadgeColorForOrderStatus(
                  order.status.toLowerCase(),
                )}
              ></Badge>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
              <h5>{order.type === 'pick-up' ? 'Pick Up' : 'Delivery'}</h5>
              <Badge
                className="pl-3 pr-3"
                value={
                  order.type === 'pick-up'
                    ? getStoreForPickup(order.storeId)
                    : getAddressForDelivery(order.address)
                }
                size="large"
                severity="info"
              ></Badge>
            </div>
            {order.completionDate && (
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Completed on:</h5>
                <Badge
                  className="w-3"
                  value={new Date(order.orderDate).toDateString()}
                  size="large"
                  severity="success"
                ></Badge>
              </div>
            )}
            {order.orderItems.map(orderItem => {
              const item = orderItem.item;
              return (
                <div className="orderItem mt-1 mb-1">
                  <div className="d-flex flex-column w-50">
                    <h5>{item.title}</h5>
                    <Rating
                      value={item.rating}
                      readOnly
                      stars={5}
                      cancel={false}
                    />
                  </div>
                  <div className="w-50 d-flex flex-row-reverse align-items-center">
                    <Badge
                      className="w-3"
                      value={'$' + item.price}
                      size="large"
                      severity="info"
                    ></Badge>
                  </div>
                </div>
              );
            })}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4>Total Cost:</h4>
              <Badge
                className="w-2"
                value={'$' + order.total}
                size="large"
                severity="info"
              ></Badge>
            </div>
            {isManager ? (
              <div className="d-flex justify-content-evenly align-items-center mt-4">
                <Button
                  label="Processing"
                  className="p-button-info p-button-raised"
                  onClick={() => {
                    handleOrderStatusChange(order.id, 'Processing');
                  }}
                />
                <Button
                  label="Packaging"
                  className="p-button-warning p-button-raised"
                  onClick={() => {
                    handleOrderStatusChange(order.id, 'Packaging');
                  }}
                />
                <Button
                  label="Out For Delivery"
                  className="p-button-warning p-button-raised"
                  onClick={() => {
                    handleOrderStatusChange(order.id, 'Out For Delivery');
                  }}
                />
                <Button
                  label="Completed"
                  className="p-button-success p-button-raised"
                  onClick={() => {
                    handleOrderStatusChange(order.id, 'Completed');
                  }}
                />
                <Button
                  label="Declined"
                  className="p-button-danger p-button-raised"
                  onClick={() => {
                    handleOrderStatusChange(order.id, 'Declined');
                  }}
                />
                <Button
                  label="Cancelled"
                  className="p-button-danger p-button-raised"
                  onClick={() => {
                    handleOrderStatusChange(order.id, 'Cancelled');
                  }}
                />
              </div>
            ) : (
              <div className="d-flex flex-row-reverse align-items-center mt-4">
                <Button
                  label="Cancel Order"
                  className="p-button-danger p-button-raised"
                  onClick={() => {
                    handleOrderCancel(order.id);
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
