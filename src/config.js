import axios from 'axios';

export const Base_URL = () => {
  let url = 'http://localhost:3001/api';
  return url;
};

const instance = axios.create({
  baseURL: Base_URL(),
});

export default instance;
