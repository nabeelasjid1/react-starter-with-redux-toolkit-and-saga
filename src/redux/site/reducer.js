/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
  loading: false,
  success: false,
  sites:[],
  errorMessage: '',
  token: null
};

const siteSlice = createSlice({
  name: 'site',
  initialState,

  reducers: {
    createSite(state) {
      state.loading = true;
    },
    createSiteSuccess(state, action) {
      return {
        ...state,
        laoding:false,
        success:true,
        sites:[...state.sites, action.payload.data]
      }
    },
    createSiteFail(state) {
      state.loading = false;
    },
    getSites(state) {
      state.loading = true;
    },
    getSitesSuccess(state, action) {
      return {
        ...state,
        laoding:false,
        success:true,
        sites:action.payload.data

      }
    },
    getSitesFail(state) {
      state.loading = false;
    },
    
    updateSite(state) {
      state.loading = true;
    },
    updateSiteSuccess(state, action) {
      return {
        ...state,
        laoding:false,
        success:true,
        sites: state.sites.map(el => el._id === action.payload.data.id ? { ...el, ...action.payload.data.site } : el)
      }
    },
    updateSiteFail(state) {
      state.loading = false;
    },
    reset(state) {
      return {
        ...state,
        loading: false,
        success: false
      };
    }
  }
});

export const { actions, reducer } = siteSlice;
// export const {
//   signup, signupSuccess, signupFail, signIn, signInSuccess, signInFail
// } = actions;
