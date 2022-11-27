import axios from '../config';

export const getProducts = id => axios.get(`/productByCategory/${id}`);

export const getServices = id => axios.get(`/serviceByCategory/${id}`);

export const getStores = () => axios.get('/store');
