import express from 'express'
import { getStockData, getSMA } from '../controllers/stock-controller.js'

const router = express.Router()

router.get('/api/sma', getSMA)
router.get('/api/stock', getStockData)

export default router
