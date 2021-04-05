/* eslint-disable */
import { API, headers } from '../../utils';

export const createSite = (data, token) => {
  headers(token);
  return API.post('/sites', data);
};

export const getSite = (token) => {
  headers(token);
  return API.get('/sites');
};

export const updateSite = (data,token) => {
  headers(token);
  return API.patch(`/sites/${data.id}`, data.site);
};
