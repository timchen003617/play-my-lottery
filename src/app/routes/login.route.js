import express from 'express'
import login from '../controllers/login.controller'
import { decodeReqPayload, setLoginLimiter } from '../../utils'

const router = express.Router()

router.post('/login', setLoginLimiter, decodeReqPayload, login.authLogin)
router.post('/logout', decodeReqPayload, login.authLogout)

export default router