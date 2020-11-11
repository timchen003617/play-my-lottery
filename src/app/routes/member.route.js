import express from 'express'
import member from '../controllers/member.controller'
import {
  validateToken, updateMemberInfoLimiter, getWheelListLimiter, getFrontOddsLimiter, getMemberInfoLimiter,
  getQuotaLimiter, changePWLimiter, decodeReqPayload
} from '../../utils'

const router = express.Router()

router.post('/getWheelList', validateToken, getWheelListLimiter, decodeReqPayload, member.getWheelList)
router.post('/getFrontOdds', validateToken, getFrontOddsLimiter, decodeReqPayload, member.getFrontOdds)
router.post('/updateMemberInfo', validateToken, updateMemberInfoLimiter, decodeReqPayload, member.updateMemberInfo)
router.post('/getMemberInfo', validateToken, getMemberInfoLimiter, decodeReqPayload, member.getMemberInfo)
router.post('/getQuota', validateToken, getQuotaLimiter, decodeReqPayload, member.getQuota)
router.post('/changePW', validateToken, changePWLimiter, decodeReqPayload, member.changePW)

export default router
