import axios from "axios";

const instance = axios.create({
  baseURL: "https://zaboapi.sparcs.org"
});

instance.interceptors.request.use(
  req => {
    // req.headers.Authorization = `${localStorage.getItem("token")}`;
    // req.headers.Authorization =
    // "Basic aHllb25nanVuQGthaXN0LmFjLmtyOmspvMTI2MTI2am8=";
    // req.headers.ContentType = 'application/json';
    return req;
  },
  error => Promise.reject(error)
);

export default instance;
