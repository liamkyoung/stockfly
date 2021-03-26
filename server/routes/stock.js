import express from 'express'
import { getStock } from '../controllers/stock-controller.js'

const router = express.Router()

router.get('/:stock', getStock)

export default router
