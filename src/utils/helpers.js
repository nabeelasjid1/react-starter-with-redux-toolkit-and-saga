/* eslint-disable */
import { toast, Flip } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import API from './baseUrl';
export const errorNotification = error => {
  if (error?.response?.data?.message) {
    toast.error(error.response?.data.message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } else {
    toast.error(error.message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }
};

export const successNotification = (
  response,
  message = 'Api call succeeded'
) => {
  const msg = response?.data?.message ? response.data.message : message;
  toast.success(msg, {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    transition: Flip,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
};

export const headers = (token = null) => {
  if (token) {
    return (API.defaults.headers.common['Authorization'] = 'Bearer ' + token);
  } else {
    return API.defaults.headers;
  }
};

export const decodeToken = token => {
  return jwt_decode(token);
};
