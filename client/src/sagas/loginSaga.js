import { call, put, cancelled, takeLatest } from "redux-saga/effects";
import {
  FETCH_LOGIN,
  fetchLoginSucceeded,
  fetchLoginEnd,
  fetchLoginError,
  fetchLoginCancel,
  showNotification,
} from "../actions";
import { push } from "connected-react-router";
import api from "../middleware/api";

function* fetchLogin(action) {
  try {
    const response = yield call(api.login, action.payload)
    yield localStorage.setItem("account", response.data.account)
    yield localStorage.setItem('token', response.jwttoken)
    yield put(push("/"));
    yield put(fetchLoginSucceeded(response));
    yield put(fetchLoginEnd());
  } catch (error) {
    let errMsg = "";
    let errCode = "";
    if (error instanceof Object && error.body instanceof Object) {
      errMsg = JSON.parse(JSON.stringify(error)).body.errorMsg;
      errCode = JSON.parse(JSON.stringify(error)).body.errorCode;
    } else {
      errMsg = error;
    }
    yield put(fetchLoginError(error));
    yield put(showNotification(errMsg.toString(), "error"));
  } finally {
    if (yield cancelled()) {
      yield put(fetchLoginCancel());
      return;
    }
  }
}

function* watchLogin() {
  yield takeLatest(FETCH_LOGIN, fetchLogin);
}

export default watchLogin;
