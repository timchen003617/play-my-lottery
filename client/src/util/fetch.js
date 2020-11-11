import 'whatwg-fetch'
import HttpError from './HttpError'
export const fetchJson = (url, options = {}) => {
    const requestHeaders =
        options.headers ||
        new Headers({
            Accept: 'application/json'
        })
    if (
        !requestHeaders.has('Content-Type') &&
        !(options && options.body && options.body instanceof FormData)
    ) {
        requestHeaders.set('Content-Type', 'application/json')
    }
    options.credentials = 'same-origin'

    const token = localStorage.getItem('token') || ''
    requestHeaders.set('authorization', `Bearer ${token}`)

    let json;
    let errorStatus;
    return fetch(url, { ...options, headers: requestHeaders })
        .then(response =>
            response.text().then(text => ({
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: text
            }))
        )
        .then(({ status, statusText, headers, body }) => {
            try {
                json = JSON.parse(body);
            } catch (error) {
                // not json, no big deal
            }
            if (status < 200 || status >= 300) {
                errorStatus = status
                return Promise.reject(json && json.message || statusText)
            }
            return { status, headers, body, json };
        })
        .catch(e => {
            
            let errMsg = ''
            if (e.message === 'Failed to fetch') {
                errMsg = '網路連線錯誤'
            } else {
                errMsg = e.message
            }
            if (typeof errMsg === 'string') {
                return Promise.reject(errMsg)
            } else {
                return Promise.reject(
                    new HttpError(json.errorMsg || errMsg, errorStatus, json)
                )
            }
        })
}

