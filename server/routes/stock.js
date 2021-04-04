import express from 'express'
import { getStockData } from '../controllers/stock-controller.js'

const router = express.Router()

router.get('/api/stock', getStockData)

export default router
