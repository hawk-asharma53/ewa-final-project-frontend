import * as AUTHAPI from 'api/authAPI';
import * as DATAAPI from 'api/dataAPI';
import storage from 'utility/storage';
import { toastMsg } from 'utility/utility';

export const Actions = set => ({
  signUp: async values => {
    set({ isLoading: true });
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
    set({ isLoading: true });
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
  getProducts: async () => {
    set({ isLoading: true });
    await DATAAPI.getProducts()
      .then(res => {
        set({ productsData: res?.data?.data });
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  getServices: async () => {
    set({ isLoading: true });
    await DATAAPI.getServices()
      .then(res => {
        set({ serviceData: res?.data?.data });
      })
      .catch(error => {
        console.log(error, 'EERROR');
      });
  },
  getStores: async () => {
    set({ isLoading: true });
    await DATAAPI.getStores()
      .then(res => {
        set({ storesData: res?.data?.data });
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
