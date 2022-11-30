import * as AUTHAPI from 'api/authAPI';
import * as DATAAPI from 'api/dataAPI';
import { routes } from 'utility/constants';
import storage from 'utility/storage';
import { toastMsg } from 'utility/utility';

export const Actions = set => ({
  signUp: async (values, callback) => {
    await AUTHAPI.signup(values)
      .then(res => {
        console.log(res);
        toastMsg(`${res?.data?.data?.message}`, false);
        callback(true);
      })
      .catch(error => {
        console.log(error);
        toastMsg(`${error?.data?.error?.message}`, true);
        callback(false);
      });
  },
  login: async values => {
    await AUTHAPI.login(values)
      .then(res => {
        set({
          userData: res?.data?.data?.user,
          auth_token: res?.data?.data?.auth_token,
        });
        storage.set('userData', res?.data?.data?.user);
        toastMsg('Login Successful');
      })
      .catch(error => {
        console.log(error, 'EERROR');
        // toastMsg(`${error?.error?.message}`, true);
      });
  },
  updateUserProfile: async (values, userId, callback) => {
    await AUTHAPI.updateUserProfile(values, userId)
      .then(res => {
        console.log(res);
        callback(true);
        toastMsg(`${res?.data?.data?.message}`, false);
      })
      .catch(error => {
        console.log(error);
        toastMsg(`${error?.data?.error?.message}`, true);
        callback(false);
      });
  },
  refreshUserProfile: async values => {
    await AUTHAPI.refreshUserProfile(values)
      .then(res => {
        set({
          userData: res?.data?.data?.user,
        });
        storage.set('userData', res?.data?.data?.user);
        toastMsg(res?.data?.data?.message, false);
      })
      .catch(error => {
        console.log(error, 'EERROR');
        // toastMsg(`${error?.error?.message}`, true);
      });
  },
  getProducts: async id => {
    await DATAAPI.getProducts(id)
      .then(res => {
        set({ productsData: res?.data?.data });
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  getAllProducts: async id => {
    await DATAAPI.getAllProducts()
      .then(res => {
        set({ productsData: res?.data?.data });
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  getAllServices: async id => {
    await DATAAPI.getAllServices()
      .then(res => {
        set({ serviceData: res?.data?.data });
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  getServices: async id => {
    await DATAAPI.getServices(id)
      .then(res => {
        set({ serviceData: res?.data?.data });
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  getStores: async location => {
    await DATAAPI.getStores(location)
      .then(res => {
        set({ storesData: res?.data?.data });
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  getStoresById: async (storeIdArray, callback) => {
    await DATAAPI.getStoresById(storeIdArray)
      .then(res => {
        callback(res?.data?.data);
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  getAddressesById: async (addressIdArray, callback) => {
    await DATAAPI.getAddressById(addressIdArray)
      .then(res => {
        callback(res?.data?.data);
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  placeOrder: async (order, emptyCart, history) => {
    await DATAAPI.placeOrder(order)
      .then(res => {
        console.log(res);
        emptyCart();
        toastMsg(`Order successfully placed`, false);
        history.push(routes.PRODUCTS);
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  logout: async values => {
    toastMsg('Logout Successful');
    storage.remove('userData');
    set({
      userData: {},
    });
  },
  getOrdersUserId: async userId => {
    await DATAAPI.getOrdersUserId(userId)
      .then(res => {
        set({ userOrdersData: res?.data?.data });
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  getOrdersStoreId: async storeId => {
    await DATAAPI.getOrdersStoreId(storeId)
      .then(res => {
        set({ userOrdersData: res?.data?.data });
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  getUsersById: async (userIdsArray, callback) => {
    await DATAAPI.getUsersById(userIdsArray)
      .then(res => {
        callback(res?.data?.data);
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  updateOrderStatus: async (orderId, status, callback) => {
    await DATAAPI.updateOrderStatus(orderId, status)
      .then(res => {
        console.log('res', res);
        callback(res?.data?.data);
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  addReview: async (review, callback) => {
    await DATAAPI.addReview(review)
      .then(res => {
        console.log('res', res);
        toastMsg('Submitted the review', false);
        callback(true);
      })
      .catch(error => {
        console.log(error, 'EERROR');
        toastMsg('Failed to submit the review', true);
        callback(false);
      });
  },
});
