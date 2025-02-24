import * as endPoints from 'networking/endpoint';
import axiosInstance from 'services/axios';

// Launch Compaign API
export const createCompaignApi = async (data) =>
  Promise.resolve(axiosInstance.post(endPoints.createCompaign, data));

export const getCampaignsListApi = async () =>
  Promise.resolve(axiosInstance.get(endPoints.getCampaignsList));

export const getCompaignDetailsApi = async (id) =>
  Promise.resolve(
    axiosInstance.get(endPoints.getCompaignDetails + `?_id=${id}`)
  );

export const extendBudgetApi = async (data) => {
  return axiosInstance.post(endPoints.extendBudget, data);
};
