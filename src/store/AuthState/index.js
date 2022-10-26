import create from 'zustand';

import { Actions } from './Actions.js';
const initialState = {
  email: '',
  password: '',
};
const useStore = create(
  (set, get) => (
    {
      // here get methods wil use for get the current state value
      ...initialState,
      ...Actions(set, get),
    },
    {
      name: 'auth-storage',
    }
  ),
);

export default useStore;
