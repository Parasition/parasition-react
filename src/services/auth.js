import axios from 'services/axios';
import { jwtDecode } from './jwt';

// token expired

export const tokenExpired = (exp) => {
  let expiredTimer;
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  }, timeLeft);
};

// setAxiosSession-

export const setAxiosSession = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // this function will handle when token is expired
    const { exp } = jwtDecode(token); // ~ 3 days by minimal server
    tokenExpired(exp);
  } else {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
  }
};
