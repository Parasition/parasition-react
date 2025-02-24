import * as endPoints from 'networking/endpoint';
import axiosInstance from 'services/axios';

// REGISTER API
export const registerApi = async (data) =>
  Promise.resolve(axiosInstance.post(endPoints.register, data));

// LOGIN API
export const loginApi = async (data) =>
  Promise.resolve(axiosInstance.post(endPoints.login, data));
