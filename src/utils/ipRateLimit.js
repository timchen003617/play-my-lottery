import rateLimit from 'express-rate-limit'

export const getCaptchaLimiter = rateLimit({
  windowMs: 1 * 1000, // 1 second
  max: 1,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getDataLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getWheelListLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getFrontOddsLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getMemberInfoLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getQuotaLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getStopListLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getIssueListLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getWinningNumberListLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getLotteyNameListLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getLotteyListLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getLotteryOpenLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getTwoWordsOddsLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getDynamicOddsLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getHistoryBillLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const getLogListLimiter = rateLimit({
  windowMs: 5 * 60 * 1 * 1000, // 5 min
  max: 350,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const setLoginLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 second
  max: 1, // limit each IP to 1 requests per windowMs
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const cleanTicketLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 second
  max: 1, // limit each IP to 1 requests per windowMs
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const cleanMemberTicketLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 second
  max: 1, // limit each IP to 1 requests per windowMs
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const cancelOrderLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 second
  max: 1, // limit each IP to 1 requests per windowMs
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const ticketPrintLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 second
  max: 5,
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const setLogLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 second
  max: 1, // limit each IP to 1 requests per windowMs
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const deleteStopLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 second
  max: 1, // limit each IP to 1 requests per windowMs
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const speedBetLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 second
  max: 1, // limit each IP to 1 requests per windowMs
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const updateMemberInfoLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 second
  max: 1, // limit each IP to 1 requests per windowMs
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

export const changePWLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 second
  max: 1, // limit each IP to 1 requests per windowMs
  message: {
    errorCode: '429',
    errorMsg: '请求太频繁，请稍后再试!'
  }
})

