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

export const percentChange = async (req, res) => {
  const { _oracledb } = req
  const { query } = req
  const { stock, days } = query

  if (stock && days) {
    const stockData = await _oracledb.execute(`
    SELECT marketdate, ROUND(((price - before_price) / before_price * 100), 2) AS pct_change
    FROM (
        SELECT marketdate, ROUND(close, 2) AS price,
        ROUND(LAG(Close, ${days}) OVER (ORDER BY marketdate), 2) as before_price
        FROM STOCKDATA
        WHERE ticker ='${stock}'
        )
    WHERE price IS NOT NULL AND before_price IS NOT NULL
      `,
    {},
    {
      fetchInfo: {
        MARKETDATE: { type: oracledb.STRING },
        PRICE: { type: oracledb.DEFAULT },
        BEFORE_PRICE: { type: oracledb.DEFAULT },
        PCT_CHANGE: { type: oracledb.DEFAULT }
      }
    })
      .catch(err => console.log('Percentage Change not Loaded.', err))

    console.log(`Percentage Data for ${stock}`, stockData)
    await _oracledb.close()

    return res.send({
      success: true,
      message: 'Percentage Data',
      data: stockData
    })
  } else {
    return res.send({
      success: false,
      message: 'No percentage data selected.'
    })
  }
}