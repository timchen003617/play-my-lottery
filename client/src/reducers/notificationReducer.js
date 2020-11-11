import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actions'

const defaultState = {
  text: '',
  type: 'info' // one of 'info', 'success', 'warning', 'error'
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SHOW_NOTIFICATION:
      return { ...payload }
    case HIDE_NOTIFICATION:
      return { ...state, text: '' }
    default:
      return state
  }
}
