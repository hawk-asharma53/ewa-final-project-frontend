import axios from 'axios';

export const Base_URL = () => {
  let url = 'https://5470-2620-f3-8000-5060-4ca3-2d39-14b1-2929.ngrok.io/api';
  return url;
};

const instance = axios.create({
  baseURL: Base_URL(),
});

export default instance;
