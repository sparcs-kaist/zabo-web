import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

instance.interceptors.request.use((req) => {
  req.headers.Authorization = 'Basic aHllb25nanVuQGthaXN0LmFjLmtyOmpvMTI2MTI2am8=';
  // req.headers.ContentType = 'application/json';
  return req;
}, error => Promise.reject(error));

export default instance;
