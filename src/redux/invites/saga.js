/* eslint-disable */
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { errorNotification, successNotification } from '../../utils';
import * as api from './service';
import { token } from '../selectors';
import { actions } from './reducer';

function* sendInviteSaga(action) {
  try {
    const authToken = yield select(token);
    const result = yield call(api.sendInvite, action.payload, authToken);
    yield put(actions.sendInviteSuccess(result.data));
    yield put(actions.reset());
    successNotification(result);
  } catch (error) {
    errorNotification(error);
    yield put(actions.sendInviteFail({ ...error }));
  }
}
function* getInviteSaga() {
  try {
    const authToken = yield select(token);
    const result = yield call(api.getInvite, authToken);
    yield put(actions.getInvitesSuccess(result.data));
    yield put(actions.reset());
  } catch (error) {
    errorNotification(error);
    yield put(actions.getInvitesFail({ ...error }));
  }
}
function* updateInviteSaga(action) {
  try {
    const authtoken = yield select(token);
    const result = yield call(api.updateInvite, action.payload, authtoken);
    yield put(actions.updateInviteSuccess({ data: action.payload }));
    yield put(actions.reset());
  } catch (error) {
    yield put(actions.updateInviteFail({ ...error }));
  }
}
export default function* inviteWatcher() {
  yield takeLatest(actions.sendInvite.type, sendInviteSaga);
  yield takeLatest(actions.getInvites.type, getInviteSaga);
  yield takeLatest(actions.updateInvite.type, updateInviteSaga);
}
