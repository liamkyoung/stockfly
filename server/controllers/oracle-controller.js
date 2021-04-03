import oracledb from 'oracledb'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const URL = process.env.CONNECTION_URL
const USER = process.env.CONNECTION_USER
const PASSWORD = process.env.CONNECTION_PASSWORD
const PATH = process.env.CONNECTION_PATH

export const dbConnect = async (req, res, next) => {
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
}
