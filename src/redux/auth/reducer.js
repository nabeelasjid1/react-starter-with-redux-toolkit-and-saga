/* eslint-disable */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';
// import { LogOut } from 'react-feather';

const initialState = {
  user: undefined,
  loading: false,
  success: false,
  errorMessage: '',
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    signup(state) {
      state.loading = true;
    },
    signupSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    signupFail(state) {
      state.loading = false;
    },
    signIn(state) { state.loading = true; },
    signInSuccess(state, action) {
      return {
        ...state,
        user: action.payload.data.user,
        token: action.payload.data.token,
        loading: false,
        success: true
      };
    },
    signInFail(state) {
      state.loading = false;
    },
    forgotPassword(state) {
      state.loading = true;
    },
    forgotPasswordSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    forgotPasswordFail(state) {
      state.loading = false;
    },
    updatePassword(state) {
      state.loading = true;
    },
    updatePasswordSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    updatePasswordFail(state) {
      state.loading = false;
    },
    verifyEmail(state) {
      state.loading = true;
    },
    verifyEmailSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    verifyEmailFail(state) {
      state.loading = false;
    },
    resetPassword(state) {
      state.loading = true;
    },
    resetPasswordSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    resetPasswordFail(state) {
      state.loading = false;
    },
    setupAccount(state) {
      state.loading = true;
    },
    setupAccountSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    setupAccountFail(state) {
      state.loading = false;
    },

    facebookSignIn(state) { state.loading = true; },
    facebookSignInSuccess(state, action) {
      return {
        ...state,
        user: action.payload.data.user,
        token: action.payload.data.token,
        loading: false,
        success: true
      };
    },
    facebookSignInFail(state) {
      state.loading = false;
    },
    googleSignIn(state) { state.loading = true; },
    googleSignInSuccess(state, action) {
      return {
        ...state,
        user: action.payload.data.user,
        token: action.payload.data.token,
        loading: false,
        success: true
      };
    },
    googleSignInFail(state) {
      state.loading = false;
    },

    resetAuth(state) {
      return {
        ...state,
        loading: false,
        success: false
      };
    },

     
    updateProfile(state) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      return {
        ...state,
        laoding:false,
        success:true,
        user: {...state.user,...action.payload.data},
      }
    },
    updateProfileFail(state) {
      state.loading = false;
    },

    logout() {
      return {
        user: undefined,
        loading: false,
        success: false,
        errorMessage: '',
        token: null
      };
    }
  }
});

export const { actions, reducer } = authSlice;
