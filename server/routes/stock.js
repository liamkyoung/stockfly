import express from 'express'
import { getStockData, getSMA, percentChange, volumeChart, dollarsTraded } from '../controllers/stock-controller.js'

const router = express.Router()

router.get('/api/percentChange', percentChange)
router.get('/api/sma', getSMA)
router.get('/api/stock', getStockData)
router.get('/api/volumeChart', volumeChart)
router.get('/api/dollarsTraded', dollarsTraded)

export default router
