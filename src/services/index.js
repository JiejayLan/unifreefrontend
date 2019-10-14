import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.api_domain;

axios.interceptors.request.use((request) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export { axios };
