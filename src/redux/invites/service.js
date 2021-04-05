/* eslint-disable */
import { API, headers } from '../../utils';

export const sendInvite = (data, token) => {
  headers(token);
  return API.post('/users', data);
};

export const getInvite = token => {
  headers(token);
  return API.get('/users');
};
export const updateInvite = (data, token) => {
  headers(token);
  console.log('invite data in api', { ...data.user });
  console.log('invite id in api', data.id);
  return API.patch(`/users/${data.id}`, data.user);
};
