export const SPEED_BET = 'SPEED_BET'
export const SPEED_BET_SUCCEEDED = 'SPEED_BET_SUCCEEDED'
export const SPEED_BET_FETCH_ERROR = 'SPEED_BET_FETCH_ERROR'
export const SPEED_BET_FETCH_CANCEL = 'SPEED_BET_FETCH_CANCEL'
export const SPEED_BET_FETCH_END = 'SPEED_BET_FETCH_END'

export const speedBet = data => ({
    type: SPEED_BET,
    payload: data
})

export const speedBetSucceeded = data => ({
    type: SPEED_BET_SUCCEEDED,
    payload: data
})

export const speedBetFetchError = error => ({
    type: SPEED_BET_FETCH_ERROR,
    payload: { error }
})

export const speedBetFetchCancel = () => ({
    type: SPEED_BET_FETCH_CANCEL
})

export const speedBetFetchEnd = () => ({
    type: SPEED_BET_FETCH_END
})