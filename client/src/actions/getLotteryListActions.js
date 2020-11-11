export const GET_LOTTERY_LIST = 'GET_LOTTERY_LIST'
export const GET_LOTTERY_LIST_SUCCEEDED = 'GET_LOTTERY_LIST_SUCCEEDED'
export const GET_LOTTERY_LIST_FETCH_ERROR = 'GET_LOTTERY_LIST_FETCH_ERROR'
export const GET_LOTTERY_LIST_FETCH_CANCEL = 'GET_LOTTERY_LIST_FETCH_CANCEL'
export const GET_LOTTERY_LIST_FETCH_END = 'GET_LOTTERY_LIST_FETCH_END'

export const getLotteryList = data => ({
    type: GET_LOTTERY_LIST,
    payload: data
})

export const getLotteryListSucceeded = data => ({
    type: GET_LOTTERY_LIST_SUCCEEDED,
    payload: data
})

export const getLotteryListFetchError = error => ({
    type: GET_LOTTERY_LIST_FETCH_ERROR,
    payload: { error }
})

export const getLotteryListFetchCancel = () => ({
    type: GET_LOTTERY_LIST_FETCH_CANCEL
})

export const getLotteryListFetchEnd = () => ({
    type: GET_LOTTERY_LIST_FETCH_END
})