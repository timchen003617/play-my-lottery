import { call, put, cancelled, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  GET_LOTTERY_LIST,
  getLotteryListSucceeded,
  getLotteryListFetchEnd,
  getLotteryListFetchError,
  getLotteryListFetchCancel,
  showNotification
} from '../actions'
import api from '../middleware/api'

function* fetchLotteryList(action) {
  try {
    const response = yield call(api.getLotteryList, action.payload)
    yield put(getLotteryListSucceeded(response))
    yield put(getLotteryListFetchEnd())
  } catch (error) {
    let errMsg = ''
    let errorCode = ''
    if (error instanceof Object && error.body instanceof Object) {
      errMsg = JSON.parse(JSON.stringify(error)).body.errorMsg
      errorCode = JSON.parse(JSON.stringify(error)).body.errorCode
    } else {
      errMsg = error
    }
    yield put(getLotteryListFetchError(error))
    if (errorCode === 'E002' || error.status === 402) {
      yield put(push('/login'))
    }
    yield put(showNotification(errMsg.toString(), 'error'))
  } finally {
    if (yield cancelled()) {
      yield put(getLotteryListFetchCancel())
      return
    }
  }
}

function* watchLotteryList() {
  yield takeEvery(GET_LOTTERY_LIST, fetchLotteryList)
}

export default watchLotteryList
