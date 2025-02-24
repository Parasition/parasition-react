import axios from 'axios';

const { REACT_APP_SERVER_API_URL } = process.env;

const axiosInstance = axios.create({
  baseURL: REACT_APP_SERVER_API_URL,
});

const authToken = localStorage.getItem('authToken');

axiosInstance.interceptors.request.use(
  function (request) {
    if (authToken) {
      request.headers.Authorization = `Bearer ${JSON.parse(authToken)}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || {
        message: 'Something went wrong',
      }
    )
);

export default axiosInstance;
