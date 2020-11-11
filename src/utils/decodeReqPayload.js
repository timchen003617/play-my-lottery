import CryptoJS from 'crypto-js'
import { Base64 } from 'js-base64'

export const decodeReqPayload = (req, res, next) => {
  let bytes = CryptoJS.AES.decrypt(req.body.encodeData, 'secret123')
  let originalText = bytes.toString(CryptoJS.enc.Utf8)
  let utf8code = JSON.parse(Base64.decode(originalText))
  req.body = utf8code
  next()
}