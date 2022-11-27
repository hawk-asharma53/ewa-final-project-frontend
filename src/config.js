import axios from 'axios';

export const Base_URL = () => {
  let url = 'http://34.66.75.54:3001/api';
  return url;
};

const instance = axios.create({
  baseURL: Base_URL(),
});

export default instance;
