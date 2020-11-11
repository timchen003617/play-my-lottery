import {
  GET_LOTTERY_LIST,
  GET_LOTTERY_LIST_SUCCEEDED,
  GET_LOTTERY_LIST_FETCH_END,
  GET_LOTTERY_LIST_FETCH_ERROR,
  GET_LOTTERY_LIST_FETCH_CANCEL
} from '../actions'

const getLotteryListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOTTERY_LIST:
      return { ...state, ...action.payload, isLoading: true }
    case GET_LOTTERY_LIST_SUCCEEDED:
      return { ...state, ...action.payload, error: '' }
    case GET_LOTTERY_LIST_FETCH_ERROR:
      return { ...state, error: action.payload.error, isLoading: false }
    case GET_LOTTERY_LIST_FETCH_END:
    case GET_LOTTERY_LIST_FETCH_CANCEL:
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export default getLotteryListReducer
