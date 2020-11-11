import {
  AUTH_REQUEST,
  AUTH_UPDATE,
  FETCH_AUTH_END,
  FETCH_AUTH_ERROR,
  FETCH_AUTH_CANCEL
} from '../actions'

const auth = (state = { token: {} }, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, isLoading: true }
    case FETCH_AUTH_END:
      return { ...state, isLoading: false }
    case AUTH_UPDATE:
      return { ...state, ...action.payload }
    case FETCH_AUTH_ERROR:
    case FETCH_AUTH_CANCEL:
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export default auth
