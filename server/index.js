import oracledb from 'oracledb'
import dotenv from 'dotenv'

dotenv.config()

// Place your own Oracle credentials in a ".env" file, in the /server folder
const URL = process.env.CONNECTION_URL
const USER = process.env.CONNECTION_USER
const PASSWORD = process.env.CONNECTION_PASSWORD
const PATH = process.env.CONNECTION_PATH

// Connects to the database
async function run () {
  oracledb.initOracleClient({ libDir: PATH })
  let connection = await oracledb.getConnection({
    user: USER,
    password: PASSWORD,
    connectString: URL
  }, (err, conn) => {
    if (err) {
      console.error('Error: Could not connect', err.message)
    } else {
      console.log('Connection Successful!')
      return conn
    }
  })
}

// Create connection
run()
