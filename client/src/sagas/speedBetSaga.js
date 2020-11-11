import {
  call,
  put,
  cancelled,
  takeEvery,
  select,
} from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  SPEED_BET,
  speedBetSucceeded,
  speedBetFetchEnd,
  speedBetFetchError,
  speedBetFetchCancel,
  showNotification,
  getLotteryList
} from "../actions";
import api from "../middleware/api";

function* fetchSpeedBet(action) {
  try {
    const response = yield call(api.speedBet, action.payload);
    yield put(speedBetSucceeded(response));
    yield put(speedBetFetchEnd());
    yield put(showNotification(response.message));

    const { limit, page } = yield select(
      (state) => state.form.pagination.values
    );

    yield put(
      getLotteryList({
        page,
        limit,
      })
    );
  } catch (error) {
    yield put(speedBetFetchError(error));
    let errMsg = "";
    let errorCode = "";
    if (error instanceof Object && error.body instanceof Object) {
      errMsg = JSON.parse(JSON.stringify(error)).body.errorMsg;
      errorCode = JSON.parse(JSON.stringify(error)).body.errorCode;
    } else {
      errMsg = error;
    }

    if (errorCode === "E002" || error.status === 402) {
      yield put(push("/login"));
    }
    yield put(showNotification(errMsg.toString(), "error"));
  } finally {
    if (yield cancelled()) {
      yield put(speedBetFetchCancel());
      return;
    }
  }
}

function* watchSpeedBet() {
  yield takeEvery(SPEED_BET, fetchSpeedBet);
}


export default watchSpeedBet;
