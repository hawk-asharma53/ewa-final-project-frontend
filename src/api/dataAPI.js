import axios from '../config';

export const getProducts = id => axios.get(`/productByCategory/${id}`);

export const getAllProducts = () => axios.get(`/product`);

export const addProduct = product => axios.post('/product', product);
export const updateProduct = product => axios.post('/updateProduct', product);

export const getServices = id => axios.get(`/serviceByCategory/${id}`);

export const getStores = () => axios.get('/store');

export const addAddress = address => axios.post('/address', address);

export const placeOrder = order => axios.post('/placeOrder', order);
