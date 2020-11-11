import { call, put, cancelled, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  AUTH_REQUEST,
  authUpdate,
  fetchAuthError,
  fetchAuthCancel,
  fetchAuthEnd,
  showNotification
} from '../actions'
import api from '../middleware/api'

function* authorization() {
  try {
    const response = yield call(api.authorization)
    const { token } = response
    if (token) {
      const authdata = {}
      authdata.token = token
      yield put(authUpdate(authdata))
      yield put(fetchAuthEnd())
    }
  } catch (error) {
    let errMsg = '', errorCode = ''
    if (error instanceof Object && error.body instanceof Object) {
      errMsg = JSON.parse(JSON.stringify(error)).body.errorMsg
      errorCode = JSON.parse(JSON.stringify(error)).body.errorCode
    } else {
      errMsg = error
    }
    yield put(fetchAuthError(errMsg.toString()))
    if (error.status === 402) {
      // 402: no token
      yield put(push('/login'))
    }
    yield put(showNotification(errMsg.toString(), 'error'))
  } finally {
    if (yield cancelled()) {
      yield put(fetchAuthCancel())
      return
    }
  }
}

function* watchAuthLogin() {
  yield takeLatest(AUTH_REQUEST, authorization)
}

export default watchAuthLogin
