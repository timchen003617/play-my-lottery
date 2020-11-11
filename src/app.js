import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { join } from 'path'
import { logger } from './utils'
import config from './config'
import routes from './app/routes'
import './config/db_mysql'

const app = express()
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1)

app.use(cookieParser())

morgan.format('tree_member', '[tree_member] :method :url :status')

app.use(morgan('tree_member'))
app.use(helmet())
app.use(cors())


const jsonParser = bodyParser.json({ limit: '8mb' })

app.use('/api', bodyParser.urlencoded({ extended: false }))
app.use('/api', jsonParser, routes)

// the __dirname is the current directory from where the script is running
app.use(express.static(join(__dirname, 'client/dist')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'client/dist')));
  //
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname = 'client/dist/index.html'));
  })
}
// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(join(__dirname = '/client/dist/index.html'));
})

app.use((err, req, res, next) => {
  logger.error('err:' + JSON.stringify(err))
  const status = err.status || 500
  const errorCode = err.errorCode || ''
  const errorMsg = err.errorMsg || err.statusText || '内部服务器错误'
  res.status(status).json({
    errorMsg: errorMsg,
    errorCode: errorCode
  })
})

const server = http.createServer(app)

export default server
