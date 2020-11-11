export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_UPDATE = 'AUTH_UPDATE';
export const FETCH_AUTH_ERROR = 'FETCH_AUTH_ERROR';
export const FETCH_AUTH_CANCEL = 'FETCH_AUTH_CANCEL';
export const FETCH_AUTH_END = 'FETCH_AUTH_END';

export const authRequest = () => ({
    type: AUTH_REQUEST
})

export const authUpdate = data => ({
    type: AUTH_UPDATE,
    payload: data
})

export const fetchAuthError = error => ({
    type: FETCH_AUTH_ERROR,
    payload: { error }
})


export const fetchAuthCancel = () => ({
    type: FETCH_AUTH_CANCEL
})

export const fetchAuthEnd = () => ({
    type: FETCH_AUTH_END
})