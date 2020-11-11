import config from '../../config'
import { fetchJson, paramsWrapper } from '../../utils'
import cache from 'memory-cache'

// 取得停押列表
const getList = (req, res, next) => {
  const account = req.body.account
  const lotteryIssueId = req.body.lotteryIssueId
  const lotteryId = req.body.lotteryId
  const token = cache.get(account)
  const url = `${config.php_server}/Lottery_stop/getList`
  const options = {}
  options.method = 'POST'

  const params = {
    lotteryIssueId,
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
//刪除停押號碼
const deleteStop = (req, res, next) => {
  const account = req.body.account
  const id = req.body.id
  const token = cache.get(account)
  const url = `${config.php_server}/Lottery_stop/deleteStop`
  const options = {}
  options.method = 'POST'

  const params = {
    id
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
  getList,
  deleteStop
}
