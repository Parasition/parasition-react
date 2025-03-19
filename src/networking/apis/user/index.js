import * as endPoints from 'networking/endpoint';
import axiosInstance from 'services/axios';

// REGISTER API
export const registerApi = async (data) =>
  Promise.resolve(axiosInstance.post(endPoints.register, data));

// LOGIN API
export const loginApi = async (data) =>
  Promise.resolve(axiosInstance.post(endPoints.login, data));

export const getUserDetailsApi = async (id) =>
  Promise.resolve(
    axiosInstance.get(endPoints.getUserDetails.replace('{id}', id))
  );
