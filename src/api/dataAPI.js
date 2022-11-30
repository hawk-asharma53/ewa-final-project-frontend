import axios from '../config';

export const getProducts = id => axios.get(`/productByCategory/${id}`);

export const getAllProducts = () => axios.get(`/product`);
export const getAllServices = () => axios.get(`/service`);

export const addProduct = product => axios.post('/product', product);
export const updateProduct = product => axios.post('/updateProduct', product);

export const addService = service => axios.post('/service', service);
export const updateService = service => axios.post('/updateService', service);

export const getServices = id => axios.get(`/serviceByCategory/${id}`);

export const getStores = val => {
  axios.get('/storeByDistance', val);
};

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

export const addReview = review => axios.post('/review', review);

export const getDashboardData = () => axios.get(`/dashboard`);
export const getProductCount = () => axios.get(`/productCount`);
export const getServiceCount = () => axios.get(`/serviceCount`);
export const getWeekelyRevenue = () => axios.get(`/weekelyRevenue`);

export const getDashboardDataByStore = storeId =>
  axios.get(`/dashboard/${storeId}`);
export const getProductCountByStore = storeId =>
  axios.get(`/productCount/${storeId}`);
export const getServiceCountByStore = storeId =>
  axios.get(`/serviceCount/${storeId}`);
export const getWeekelyRevenueByStore = storeId =>
  axios.get(`/weekelyRevenue/${storeId}`);
