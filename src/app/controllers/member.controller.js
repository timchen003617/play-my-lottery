import config from '../../config'
import { fetchJson, paramsWrapper } from '../../utils'
import cache from 'memory-cache'


// 各玩法資訊列表
const getWheelList = (req, res, next) => {
  const account = req.body.account
  const lotteryId = req.body.lotteryId

  const token = cache.get(account)
  const url = `${config.php_server}/Member/getWheelList`
  const options = {}
  options.method = 'POST'

  const params = {
    lotteryId
  }
  let data = paramsWrapper(params)
  data = `data=${token}.${data}`
  options.body = data
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json)
    })
    .catch(next)
}

//取得回水與賠率資料
const getFrontOdds = (req, res, next) => {
  const account = req.body.account
  const lotteryId = req.body.lotteryId

  const token = cache.get(account)
  const url = `${config.php_server}/Member/getFrontOdds`
  const options = {}
  options.method = 'POST'

  const params = {
    lotteryId
  }
  let data = paramsWrapper(params)
  data = `data=${token}.${data}`
  options.body = data
  fetchJson(url, options, req)
    .then(({ json }) => {
      let items25 = json.data['25'].map(item => {
        item.odds = item.odds.split(',')[0]
        return item
      })

      json.data['25'] = items25
      let items27 = json.data['27'].map(item => {
        item.odds = item.odds.split(',')[0]
        return item
      })
      json.data['27'] = items27

      let items29 = json.data['29'].map(item => {
        item.odds = item.odds.split(',')[0]
        return item
      })
      json.data['29'] = items29
      res.json(json)
    })
    .catch(next)
}
//提交會員資料
const updateMemberInfo = (req, res, next) => {
  const account = req.body.account
  const lotteryId = req.body.lotteryId
  const lotteryTypeId = req.body.lotteryTypeId
  const water = req.body.water
  const printStatus = req.body.printStatus
  const printLimit = req.body.printLimit || '24'

  const token = cache.get(account)
  const url = `${config.php_server}/Member/updateMemberInfo`
  const options = {}
  options.method = 'POST'

  const params = {
    lotteryId,
    lotteryTypeId,
    water,
    printStatus,
    printLimit
  }
  let data = paramsWrapper(params)
  data = `data=${token}.${data}`
  options.body = data
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json)
    })
    .catch(next)
}

//取得會員資料
const getMemberInfo = (req, res, next) => {
  const account = req.body.account
  const token = cache.get(account)
  const url = `${config.php_server}/Member/getMemberInfo`
  const options = {}
  options.method = 'POST'

  const params = {}

  let data = paramsWrapper(params)
  data = `data=${token}.${data}`
  options.body = data
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json)
    })
    .catch(next)
}

//1.5取得會員額度
const getQuota = (req, res, next) => {
  const account = req.body.account
  const lotteryId = req.body.lotteryId
  const lotteryIssueId = req.body.lotteryIssueId
  const token = cache.get(account)
  const url = `${config.php_server}/Member/getQuota`
  const options = {}
  options.method = 'POST'

  const params = {
    lotteryId,
    lotteryIssueId
  }

  let data = paramsWrapper(params)
  data = `data=${token}.${data}`
  options.body = data
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json)
    })
    .catch(next)
}

// 修改密碼
const changePW = (req, res, next) => {
  const account = req.body.account
  const password = req.body.password
  const newPW = req.body.newPW
  const confirmPw = req.body.confirmPw

  const token = cache.get(account)
  const url = `${config.php_server}/Member/changePW`
  const options = {}
  options.method = 'POST'

  const params = {
    password,
    newPW,
    confirmPw
  }
  let data = paramsWrapper(params)
  data = `data=${token}.${data}`
  options.body = data
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json)
    })
    .catch(next)
}

export default {
  getWheelList,
  getFrontOdds,
  updateMemberInfo,
  getMemberInfo,
  getQuota,
  changePW
}
