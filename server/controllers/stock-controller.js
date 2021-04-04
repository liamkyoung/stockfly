import oracledb from 'oracledb'

export const getStockData = async (req, res) => {
  const { _oracledb } = req
  const { query } = req
  const { stock } = query
  console.log('here2')
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
