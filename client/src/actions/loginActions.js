export const FETCH_LOGIN = 'FETCH_LOGIN'
export const FETCH_LOGIN_SUCCEEDED = 'FETCH_LOGIN_SUCCEEDED'
export const FETCH_LOGIN_ERROR = 'FETCH_LOGIN_ERROR'
export const FETCH_LOGIN_CANCEL = 'FETCH_LOGIN_CANCEL'
export const FETCH_LOGIN_END = 'FETCH_LOGIN_END'

export const fetchLogin = payload => ({
    type: FETCH_LOGIN,
    payload
})

export const fetchLoginSucceeded = payload => ({
    type: FETCH_LOGIN_SUCCEEDED,
    payload
})

export const fetchLoginError = error => ({
    type: FETCH_LOGIN_ERROR,
    payload: { error }
})

export const fetchLoginCancel = () => ({
    type: FETCH_LOGIN_CANCEL
})

export const fetchLoginEnd = () => ({
    type: FETCH_LOGIN_END
})

