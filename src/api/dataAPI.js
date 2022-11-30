import axios from '../config';

export const getProducts = id => axios.get(`/productByCategory/${id}`);

export const getServices = id => axios.get(`/serviceByCategory/${id}`);

export const getStores = () => axios.get('/store');

export const getStoresById = storeIdArray =>
  axios.post('/storesById', storeIdArray);

export const getAddressById = addressIdArray =>
  axios.post('/addressById', addressIdArray);

export const getUsersById = userIdsArray =>
  axios.post('/userbyId', userIdsArray);

export const updateOrderStatus = (orderId, status) => {
  axios.post('/updateOrderStatus', { orderId, status });
};

export const addAddress = address => axios.post('/address', address);

export const placeOrder = order => axios.post('/placeOrder', order);

export const getOrdersUserId = userId => axios.get(`/orderByUser/${userId}`);

export const getOrdersStoreId = storeId =>
  axios.get(`/orderByStore/${storeId}`);
