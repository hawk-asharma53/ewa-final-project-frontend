import * as AUTHAPI from 'api/authAPI';
import * as DATAAPI from 'api/dataAPI';
import { routes } from 'utility/constants';
import storage from 'utility/storage';
import { toastMsg } from 'utility/utility';

export const Actions = set => ({
  signUp: async values => {
    await AUTHAPI.signup(values)
      .then(res => {
        console.log(res);
        toastMsg(`${res?.data?.error?.message}`, true);
        toastMsg(`${res?.data?.message}`, false);
      })
      .catch(error => {
        console.log(error);
        toastMsg(`${error?.data?.error?.message}`, true);
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
  getServices: async id => {
    await DATAAPI.getServices(id)
      .then(res => {
        set({ serviceData: res?.data?.data });
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  getStores: async () => {
    await DATAAPI.getStores()
      .then(res => {
        set({ storesData: res?.data?.data });
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
});
