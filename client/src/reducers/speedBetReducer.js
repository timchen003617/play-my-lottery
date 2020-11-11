import {
  SPEED_BET,
  SPEED_BET_SUCCEEDED,
  SPEED_BET_FETCH_END,
  SPEED_BET_FETCH_ERROR,
  SPEED_BET_FETCH_CANCEL
} from '../actions'

const speedBetReducer = (state = {}, action) => {
  switch (action.type) {
    case SPEED_BET:
      return { ...state, ...action.payload, isLoading: true }
    case SPEED_BET_SUCCEEDED:
      return { ...state, ...action.payload, error: '' }
    case SPEED_BET_FETCH_ERROR:
      return { ...state, error: action.payload.error, isLoading: false }
    case SPEED_BET_FETCH_END:
      return { ...state, isLoading: false }
    case SPEED_BET_FETCH_CANCEL:
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export default speedBetReducer
