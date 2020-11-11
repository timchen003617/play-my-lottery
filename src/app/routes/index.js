import express from 'express'
import login from './login.route'
import authorization from './authorization.route'
import lottery from './lottery.route'
import member from './member.route'
import stopLottery from './stopLottery.route'

const routes = express()

routes.use('/authorization', authorization)
routes.use('/login', login)
routes.use('/Lottery', lottery)
routes.use('/Member', member)
routes.use('/Lottery_stop', stopLottery)

export default routes
