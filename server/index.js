import oracledb from 'oracledb'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import stockRoutes from './routes/stock.js'
import { dbConnect } from './controllers/oracle-controller.js'

dotenv.config()

// Place your own Oracle credentials in a ".env" file, in the /server folder
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ limit: '30mb', extended: true }), cors())
// Connects to the database
app.all('*', dbConnect, stockRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}, Express listening.`))
// Routes
// app.get('/api/stock', stockRoutes)
