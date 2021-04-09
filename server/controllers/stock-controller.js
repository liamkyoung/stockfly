import oracledb from 'oracledb'

export const getStockData = async (req, res) => {
  const { _oracledb } = req
  const { query } = req
  const { stock } = query

  if (stock) {
    console.log(stock)
    const stockData = await _oracledb.execute(`
      SELECT marketdate, close
      FROM stockdata
      WHERE ticker = '${stock}'
    `,
    {},
    {
      fetchInfo: {
        MARKETDATE: { type: oracledb.STRING },
        CLOSE: { type: oracledb.DEFAULT }
      }
    })
    console.log(`Stock Data for ${stock}`, stockData)
    await _oracledb.close()
    return res.send({
      success: true,
      message: 'stock data successfully loaded',
      stockName: stock,
      data: stockData
    })
  } else {
    console.log('got here.')
    await _oracledb.close()
    return res.send({
      success: false,
      message: 'failed getting stock'
    })
  }
}

export const getSMA = async (req, res) => {
  const { _oracledb } = req
  const { query } = req
  const { stock, days } = query
  console.log('got here')
  if (stock) {
    console.log(stock)
    const stockData = await _oracledb.execute(`
    SELECT marketdate, avg(close) OVER(ORDER BY marketdate 
      ROWS BETWEEN ${days - 1} PRECEDING AND CURRENT ROW) 
      as moving_avg 
      FROM (SELECT marketdate, close
          FROM StockData
          WHERE ticker = '${stock}')
      `,
    {},
    {
      fetchInfo: {
        MARKETDATE: { type: oracledb.STRING },
        MOVING_AVG: { type: oracledb.DEFAULT }
      }
    })
      .catch(err => console.log('Simple Moving Average Not Loaded..', err))

    console.log(`SMA Data for ${stock}`, stockData)
    await _oracledb.close()

    return res.send({
      success: true,
      message: 'Simple moving average',
      data: stockData
    })
  } else {
    console.log('Stock was not loaded')
    return res.send({
      success: false,
      message: 'Failed getting SMA'
    })
  }
}