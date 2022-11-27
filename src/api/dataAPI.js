import axios from '../config';

export const getProducts = () => axios.get('/product');

export const getServices = () => axios.get('/service');

export const getStores = () => axios.get('/store');
