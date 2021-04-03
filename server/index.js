import oracledb from 'oracledb'
import dotenv from 'dotenv'
import express from 'express'

import stockRoutes from './routes/stock.js'
import { dbConnect } from './controllers/oracle-controller.js'

dotenv.config()

// Place your own Oracle credentials in a ".env" file, in the /server folder
const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server is running, Express listening.'))

// Connects to the database
app.all('*', dbConnect)
app.get('/api/stock', stockRoutes)
