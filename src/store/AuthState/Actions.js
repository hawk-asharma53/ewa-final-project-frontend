import * as API from 'api/authAPI';
import storage from 'utility/storage';
import { toastMsg } from 'utility/utility';

export const Actions = set => ({
  signUp: async values => {
    set({ isLoading: true });
    await API.signup(values)
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
    await API.login(values)
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
  logout: async values => {
    toastMsg('Logout Successful');
    storage.remove('userData');
    set({
      userData: {},
    });
  },
});
