import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 15000,
});

export default api;
