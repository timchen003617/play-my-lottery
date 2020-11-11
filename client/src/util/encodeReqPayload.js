import CryptoJS from 'crypto-js'
import { Base64 } from 'js-base64'

export const encodeReqPayload = payload => {
  let encodeData = Base64.encode(JSON.stringify(payload))
  encodeData = CryptoJS.AES.encrypt(encodeData, 'secret123').toString()
  return encodeData
}