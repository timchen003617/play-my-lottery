import express from 'express'
import authorization from '../controllers/authorization.controller'
import { validateToken } from '../../utils'

const router = express.Router()

router.get('/', validateToken, authorization.authLogin)

export default router