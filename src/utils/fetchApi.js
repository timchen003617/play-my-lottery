const nodeFetch = require('node-fetch')
import HttpError from './HttpError'
import { logger } from './logger'

export const fetchJson = (url, options = {}, req) => {
  let sessionid = req.headers['set-cookie'][0]
  logger.debug(`url:${url},sessionid:${sessionid}`)
  logger.debug(`url:${url},token:${options.body.split('.')[0]}`)
  const requestHeaders = options.headers || {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    origin: req.get('host'),
    cookie: sessionid,
    'cache-control': 'no-cache'
  }

  return nodeFetch(url, {
    ...options,
    headers: requestHeaders
  })
    .then(response => {
      return response.text().then(text => {
        return {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          body: text
        }
      })
    })
    .then(({ status, statusText, headers, body }) => {
      logger.trace(`url:${url},response:${body}`)
      let json
      try {
        json = JSON.parse(body)
      } catch (error) {
      }
      if (status < 200 || status >= 300) {
        return Promise.reject(
          new HttpError((json && json.errorMsg) || statusText, status, json)
        )
      }
      if (json && json.errorCode) {
        return Promise.reject({
          status: status,
          errorCode: json.errorCode,
          errorMsg: json.errorMsg
        })
      }
      return { status, headers, body, json }
    })
}

export const fetchImage = (url, options = {}, req) => {
  const host = req.get('host')
  logger.debug(`url:${url}, options:${JSON.stringify(options)} host: ${host}`)
  return nodeFetch(url, {
    ...options,
    headers: { origin: host }
  }).then(response => {
    //return response.text()
    return response.arrayBuffer().then(buffer => {
      const base64Flag = 'data:image/png;base64,'
      const imageStr = arrayBufferToBase64(buffer)
      let image = base64Flag + imageStr
      return { image, headers: response.headers }
    })
  })
}

export const paramsWrapper = params => {
  logger.debug(`request Body:${JSON.stringify(params)}`)
  let data = encodeURIComponent(
    Buffer.from(encodeURIComponent(JSON.stringify(params))).toString('base64')
  )
  return data
}

const arrayBufferToBase64 = buffer => {
  let binary = ''
  let bytes = [].slice.call(new Uint8Array(buffer))

  bytes.forEach(b => (binary += String.fromCharCode(b)))

  return Buffer.from(buffer, 'binary').toString('base64')
}
