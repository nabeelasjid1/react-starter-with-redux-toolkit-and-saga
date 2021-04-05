/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
  loading: false,
  success: false,
  invites: [],
  errorMessage: '',
  token: null
};

const inviteSlice = createSlice({
  name: 'invite',
  initialState,

  reducers: {
    sendInvite(state) {
      state.loading = true;
    },
    sendInviteSuccess(state, action) {
      return {
        ...state,
        loading: false,
        success: true,
        invites: [...state.invites, action.payload.data]
      };
    },
    sendInviteFail(state) {
      state.loading = false;
    },
    getInvites(state) {
      state.loading = true;
    },
    getInvitesSuccess(state, action) {
      return {
        ...state,
        loading: false,
        success: true,
        invites: action.payload.data
      };
    },
    getInvitesFail(state) {
      state.loading = false;
    },

    updateInvite(state) {
      state.loading = true;
    },
    updateInviteSuccess(state, action) {
      console.log('reducer', action.payload);
      return {
        ...state,
        loading: false,
        success: true,
        invites: state.invites.map(el =>
          el._id === action.payload.data.id
            ? { ...el, ...action.payload.data.user }
            : el
        )
      };
    },
    updateInviteFail(state) {
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

export const { actions, reducer } = inviteSlice;
