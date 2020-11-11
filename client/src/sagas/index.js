import { all } from 'redux-saga/effects'
import watchAuthLogin from './authSaga'
import watchLogin from './loginSaga'
import watchLotteryList from './getLotteryListSaga'
import watchSpeedBet from './speedBetSaga'


export default () => {
  return function* rootSaga() {
    yield all([
      watchAuthLogin(),
      watchLogin(),
      watchLotteryList(),
      watchSpeedBet()
    ])
  }
}
