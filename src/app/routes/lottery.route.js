import express from 'express'
import lottery from '../controllers/lottery.controller'
import {
  validateToken, getIssueListLimiter, getWinningNumberListLimiter, getLotteyNameListLimiter, getLotteyListLimiter,
  getLotteryOpenLimiter, cleanTicketLimiter, cleanMemberTicketLimiter, cancelOrderLimiter,
  ticketPrintLimiter, getTwoWordsOddsLimiter, getDynamicOddsLimiter, getHistoryBillLimiter, getLogListLimiter,
  speedBetLimiter, setLogLimiter, decodeReqPayload
} from '../../utils'


const router = express.Router()

router.post('/getList', validateToken, getIssueListLimiter, decodeReqPayload, lottery.getIssueList)
router.post('/getWinningNumberList', validateToken, getWinningNumberListLimiter, decodeReqPayload, lottery.getWinningNumberList)
router.post('/getOdds', validateToken, decodeReqPayload, lottery.getOdds)
router.post('/speedBet', validateToken, speedBetLimiter, decodeReqPayload, lottery.speedBet)
router.post('/getLotteyNameList', validateToken, getLotteyNameListLimiter, decodeReqPayload, lottery.getLotteyNameList)
router.post('/getLotteryList', validateToken, getLotteyListLimiter, decodeReqPayload, lottery.getLotteryList)
router.post('/getLotteryOpen', validateToken, getLotteryOpenLimiter, decodeReqPayload, lottery.getLotteryOpen)
router.post('/cleanTicket', validateToken, cleanTicketLimiter, decodeReqPayload, lottery.cleanTicket)
router.post('/cleanMemberTicket', validateToken, cleanMemberTicketLimiter, decodeReqPayload, lottery.cleanMemberTicket)
router.post('/cancelOrder', validateToken, cancelOrderLimiter, decodeReqPayload, lottery.cancelOrder)
router.post('/ticketPrint', validateToken, ticketPrintLimiter, decodeReqPayload, lottery.ticketPrint)
router.post('/getTwoWordsOdds', validateToken, getTwoWordsOddsLimiter, decodeReqPayload, lottery.getTwoWordsOdds)
router.post('/getDynamicOdds', validateToken, getDynamicOddsLimiter, decodeReqPayload, lottery.getDynamicOdds)
router.post('/getHistoryBill', validateToken, getHistoryBillLimiter, decodeReqPayload, lottery.getHistoricalBill)
router.post('/getLogList', validateToken, getLogListLimiter, decodeReqPayload, lottery.getLogList)
router.post('/setLogRecord', validateToken, setLogLimiter, decodeReqPayload, lottery.setLogRecord)

export default router
