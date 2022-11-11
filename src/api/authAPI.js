import axios from '../config';

export const login = credentials => axios.post('/login', credentials);

export const signup = credentials => axios.post('/signup', credentials);
