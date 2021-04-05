/* eslint-disable */
import { API ,headers} from '../../utils';

export const signUpUser = (data) => {
  return API.post('/auth/signUp', data);
};

export const signInUser = (data) => {
  return API.post('/auth/signIn', data);
};
export const facebookSignInApi = (data) => {
  return API.post('/auth/facebookLogin', data);
};
export const googleSignInApi = (data) => {
  return API.post('/auth/googleLogin', data);
};

export const verifyEmailApi = (data) => {
  return API.patch('/auth/verifyAccount', data);
};

export const forgotPasswordApi = (data) => {
  return API.post('/auth/forgotPassword', data);
};
export const resetPasswordApi = (data) => {
  return API.patch('/auth/resetPassword', data);
};
export const setupAccountApi = (data) => {
  return API.patch('/users/setupAccount', data);
};

export const resendCodeApi = (data) => {
  return API.post('/auth/resend', data);
};


export const updateProfile = (data,token) => {
  headers(token);
  return API.post(`/users/updateProfile`, data);
};

export const updatePasswordApi = (data,token) => {
  headers(token);
  return API.post('/users/changePassword', data);
};
