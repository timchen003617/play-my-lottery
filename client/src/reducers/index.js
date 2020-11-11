import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form"
import { connectRouter } from "connected-react-router"
import authReducer from './authReducer'
import notificationReducer from './notificationReducer'
import loginReducer from "./loginReducers"
import speedBetReducer from './speedBetReducer'
import getLotteryListReducer from './getLotteryListReducer'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    auth: authReducer,
    login: loginReducer,
    notification: notificationReducer,
    speedBet: speedBetReducer,
    lotteryList: getLotteryListReducer
  });

export default createRootReducer;
