import axios from '../config';

export const login = credentials => axios.post('/login', credentials);

export const signup = credentials => axios.post('/signup', credentials);

export const updateUserProfile = (credentials, userId) =>
  axios.put(`/users/${userId}`, credentials);

export const refreshUserProfile = userId => axios.get(`/users/${userId}`);
