import {
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCEEDED,
    FETCH_LOGIN_END,
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_CANCEL
  } from '../actions'
  
  const loginReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_LOGIN:
        return { ...state, ...action.payload, isLoading: true }
      case FETCH_LOGIN_SUCCEEDED:
        return { ...state, ...action.payload, error: '' }
      case FETCH_LOGIN_ERROR:
        return { ...state, error: action.payload.error, isLoading: false }
      case FETCH_LOGIN_END:
      case FETCH_LOGIN_CANCEL:
        return { ...state, isLoading: false }
      default:
        return state
    }
  }
  
  export default loginReducer
  