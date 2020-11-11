export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

export const showNotification = (text, type, vertical, horizontal) => ({
    type: SHOW_NOTIFICATION,
    payload: { text, type, vertical, horizontal }
})

export const hideNotification = () => ({
    type: HIDE_NOTIFICATION,
});