/* eslint-disable */
/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { auth } from '../auth';
import {site}from '../site'
import {invite}from '../invites'
// import history from '../../utils/history';

export default function createReducer(history) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    auth,
    site,
    invite
  });

  return rootReducer;
}
