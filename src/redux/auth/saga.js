/* eslint-disable */
import { put, call, takeLatest,select } from 'redux-saga/effects';
import { errorNotification, successNotification } from '../../utils';
import * as api from './service';
import { actions } from './reducer';
import {token} from '../selectors'

function* singUpSaga(action) {
  try {
    const result = yield call(api.signUpUser, action.payload);
    successNotification(result);
    yield put(actions.signupSuccess({ ...result.data }));
    yield put(actions.resetAuth());
  } catch (error) {
    errorNotification(error);
    yield put(actions.signupFail({ ...error }));
  }
}

function* signInSaga(action) {
  try {
    const result = yield call(api.signInUser, action.payload);
    successNotification(result);
    yield put(actions.signInSuccess(result.data));
    yield put(actions.resetAuth());
  } catch (error) {
    errorNotification(error);
    yield put(actions.signInFail({ ...error }));
  }
}

function* facebookSignInSaga(action) {
  try {
    const result = yield call(api.facebookSignInApi, action.payload);
    successNotification(result);
    yield put(actions.facebookSignInSuccess(result.data));
    yield put(actions.resetAuth());
  } catch (error) {
    errorNotification(error);
    yield put(actions.facebookSignInFail({ ...error }));
  }
}

function* googleSignInSaga(action) {
  try {
    const result = yield call(api.googleSignInApi, action.payload);
    successNotification(result);
    yield put(actions.googleSignInSuccess(result.data));
    yield put(actions.resetAuth());
  } catch (error) {
    errorNotification(error);
    yield put(actions.googleSignInFail({ ...error }));
  }
}

function* forgotPasswordSaga(action) {
  try {
    const result = yield call(api.forgotPasswordApi, action.payload);
    successNotification(result);
    yield put(actions.forgotPasswordSuccess({ ...result.data }));
    yield put(actions.resetAuth());
  } catch (error) {
    errorNotification(error);
    yield put(actions.forgotPasswordFail({ ...error }));
  }
}

function* verifyEmailSaga(action) {
  try {
    const result = yield call(api.verifyEmailApi, action.payload);
    successNotification(result);
    yield put(actions.verifyEmailSuccess({ ...result }));
    yield put(actions.resetAuth());
  } catch (error) {
    errorNotification(error);
    yield put(actions.verifyEmailFail({ ...error }));
  }
}
function* resetPasswordSaga(action) {
  try {
    const result = yield call(api.resetPasswordApi, action.payload);
    successNotification(result);
    yield put(actions.resetPasswordSuccess({ ...result }));
    yield put(actions.resetAuth());
  } catch (error) {
    errorNotification(error);
    yield put(actions.resetPasswordFail({ ...error }));
  }
}

function* setupAccountSaga(action) {
  try {
    const result = yield call(api.setupAccountApi, action.payload);
    successNotification(result);
    yield put(actions.setupAccountSuccess({ ...result }));
    yield put(actions.resetAuth());
  } catch (error) {
    errorNotification(error);
    yield put(actions.setupAccountFail({ ...error }));
  }
}
function* updateProfileSaga(action) {
  try {
    const authtoken = yield select(token)
  const result = yield call(api.updateProfile,action.payload, authtoken);
  yield put(actions.updateProfileSuccess( {data: action.payload}));
    yield put(actions.reset());
  } catch (error) {
    yield put(actions.updateProfileFail({ ...error }));
  } 
}
function* updatePasswordSaga(action) {
  try {
    const authtoken = yield select(token)
    const result = yield call(api.updatePasswordApi, action.payload,authtoken);
    successNotification(result);
    yield put(actions.updatePasswordSuccess({ ...result.data }));
    yield put(actions.resetAuth());
  } catch (error) {
    errorNotification(error);
    yield put(actions.updatePasswordFail({ ...error }));
  }
}


export default function* authWatcher() {
  yield takeLatest(actions.signup.type, singUpSaga);
  yield takeLatest(actions.signIn.type, signInSaga);
  yield takeLatest(actions.facebookSignIn.type, facebookSignInSaga);
  yield takeLatest(actions.googleSignIn.type, googleSignInSaga);
  yield takeLatest(actions.verifyEmail.type, verifyEmailSaga);
  yield takeLatest(actions.forgotPassword.type, forgotPasswordSaga);
  yield takeLatest(actions.resetPassword.type, resetPasswordSaga);
  yield takeLatest(actions.setupAccount.type, setupAccountSaga);
  yield takeLatest(actions.updateProfile.type, updateProfileSaga);
  yield takeLatest(actions.updatePassword.type, updatePasswordSaga);
  
}
