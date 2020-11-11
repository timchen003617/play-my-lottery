import express from 'express'
import stopLottery from '../controllers/stopLottery.controller'
import { validateToken, deleteStopLimiter, getStopListLimiter, decodeReqPayload } from '../../utils'

const router = express.Router()

router.post('/getList', validateToken, getStopListLimiter, decodeReqPayload, stopLottery.getList)
router.post('/deleteStop', validateToken, deleteStopLimiter, decodeReqPayload, stopLottery.deleteStop)

export default router