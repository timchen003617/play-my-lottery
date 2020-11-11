import jwt from 'jsonwebtoken'
import config from '../config'
import HttpError from './HttpError'

export const sign_token = (payload = {}) => {
  try {
    return jwt.sign(payload, config.secret, {
      expiresIn: config.expiresIn
    })
  } catch (err) {
    return false
  }
}

export const verify_token = token => {
  try {
    return jwt.verify(token, config.secret)
  } catch (err) {
    return false
  }
}

export const decode_token = token => {
  try {
    return jwt.decode(token)
  } catch (err) {
    return false
  }
}

export const validateToken = (req, res, next) => {
  const authorizationHeaader = req.headers.authorization
  let result
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(' ')[1] // Bearer <token>

    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = verify_token(token)
      const payload = result
      if (payload && payload.user) {
        // We call next to pass executiosn to the subsequent middleware
        next()
      } else {
        res.status(402).json({ errorCode: 'E002', errorMsg: '請先登入' })
      }
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      throw new HttpError(err)
    }
  } else {
    result = {
      message: `Authentication error. Token required.`,
      status: 401
    }
    res.status(401).json({ result })
  }
}
