import oracledb from 'oracledb'
import dotenv from 'dotenv'
import express from 'express'

import stockRoutes from './routes/stock.js'

dotenv.config()

// Place your own Oracle credentials in a ".env" file, in the /server folder
const URL = process.env.CONNECTION_URL
const USER = process.env.CONNECTION_USER
const PASSWORD = process.env.CONNECTION_PASSWORD
const PATH = process.env.CONNECTION_PATH
const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server is running, Express listening.'))

// Connects to the database
app.use((req, res, next) => {
  console.log('here1')
  oracledb.getConnection({
    user: USER,
    password: PASSWORD,
    connectString: URL
  }, (err, conn) => {
    if (err) {
      console.log('ERROR: Connection with server', err)
    } else {
      req._oracledb = conn
      next()
    }
  })
})

app.get('/api/stock', async (req, res) => {
  console.log('here2')
  console.log(req._oracledb)
  const result = await req._oracledb.execute(`
  SELECT *
  FROM stock
  WHERE ticker = 'AFL'`)

  console.log(result)
}, (err, result) => {
  if (err) {
    return res.send({
      message: 'Error conducting query',
      success: false
    })
  } else {
    console.log(result)
    return res.send({
      message: 'Query Success',
      success: true
    })
  }
})



// async function run () {
//   try {
//     let connection = await oracledb.getConnection({
//       user: USER,
//       password: PASSWORD,
//       connectString: URL
//     })

//     // Example Query
//     const result = await connection.execute(
//       `SELECT *
//        FROM stock
//        WHERE ticker = 'AFL'`
//     )
//     // Results of Query
//     console.log(result.rows)
//   } catch (err) {
//     console.log('ERROR: ', err)
//   }
// }

// // Create connection
// run()

// Express App


// app.use('/api/stock', stockRoutes)