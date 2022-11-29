import storage from 'utility/storage.js';
import create from 'zustand';

import { Actions } from './Actions.js';
const initialState = {
  userData: storage.get('userData', null),
  auth_token: '',
  productsData: [],
  serviceData: [],
  storesData: [],
};
const useStore = create((set, get) => ({
  // here get methods wil use for get the current state value
  ...initialState,
  ...Actions(set, get),
}));

export default useStore;
