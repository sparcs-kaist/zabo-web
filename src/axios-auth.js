import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

instance.interceptors.request.use((req) => {
  req.headers.Authorization = `ZABO ${localStorage.getItem('token')}`;
  // req.headers.ContentType = 'application/json';
  return req;
}, error => Promise.reject(error));

export default instance;
