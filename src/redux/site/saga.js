/* eslint-disable */
import { put, call, takeLatest,select } from 'redux-saga/effects';
import { errorNotification, successNotification } from '../../utils';
import * as api from './service';
import {token} from '../selectors'

import { actions } from './reducer';


function* createSiteSaga(action) {
  try {
    const authtoken = yield select(token)
    const result = yield call(api.createSite, action.payload, authtoken);
    yield put(actions.createSiteSuccess(result.data));
    successNotification(result);
    yield put(actions.reset());
  } catch (error) {
    errorNotification(error);
    yield put(actions.createSiteFail({ ...error }));
  }
}
function* getSitesSaga() {
  try {
    const authtoken = yield select(token)
    const result = yield call(api.getSite, authtoken);
    yield put(actions.getSitesSuccess(result.data));
    yield put(actions.reset());
    
  } catch (error) {
    // errorNotification(error);
    yield put(actions.getSitesFail({ ...error }));
  }
}
function* updateSitesSaga(action) {
  try {
    const authtoken = yield select(token)
    const result = yield call(api.updateSite,action.payload, authtoken);
    yield put(actions.updateSiteSuccess( {data: action.payload}));
    yield put(actions.reset());
  } catch (error) {
    yield put(actions.updateSiteFail({ ...error }));
  }
}



export default function* siteWatcher() {
  
  yield takeLatest(actions.createSite.type, createSiteSaga);
  yield takeLatest(actions.getSites.type, getSitesSaga);
  yield takeLatest(actions.updateSite.type, updateSitesSaga);
  
}
