import oracledb from 'oracledb'

export const getStockData = async (req, res) => {
  const { _oracledb } = req;
  const { query } = req;
  const { stock } = query;

  if (stock) {
    console.log("Loading Stock: ", stock);
    const stockData = await _oracledb.execute(
      `
      SELECT marketdate, close
      FROM LKY.stockdata
      WHERE ticker = '${stock}'
    `,
      {},
      {
        fetchInfo: {
          MARKETDATE: { type: oracledb.STRING },
          CLOSE: { type: oracledb.DEFAULT },
        },
      }
    );
    console.log(`Stock Data for ${stock}`, stockData);
    await _oracledb.close();
    console.log("Database Connection Closed.");

    return res.send({
      success: true,
      message: "stock data successfully loaded",
      stockName: stock,
      data: stockData
    })
  } else {
    console.log("got here.");
    await _oracledb.close()
    return res.send({
      success: false,
      message: "failed getting stock"
    })
  }
}

export const getSMA = async (req, res) => {
  const { _oracledb } = req
  const { query } = req
  const { stock, days } = query
  console.log("Attempting to Load SMA")
  if (stock) {
    console.log(stock)
    const stockData = await _oracledb
      .execute(
        `
    SELECT marketdate, avg(close) OVER(ORDER BY marketdate 
      ROWS BETWEEN ${days - 1} PRECEDING AND CURRENT ROW) 
      as moving_avg 
      FROM (SELECT marketdate, close
          FROM LKY.StockData
          WHERE ticker = '${stock}')
      `,
        {},
        {
          fetchInfo: {
            MARKETDATE: { type: oracledb.STRING },
            MOVING_AVG: { type: oracledb.DEFAULT },
          }
        }
      )
      .catch((err) => console.log("Simple Moving Average Not Loaded..", err))

    console.log(`SMA Data for ${stock}`, stockData)
    await _oracledb.close()
    console.log('Database Connection Closed.')

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
    const stockData = await _oracledb
      .execute(
        `
    SELECT marketdate, ROUND(((price - before_price) / before_price * 100), 2) AS pct_change
    FROM (
        SELECT marketdate, ROUND(close, 2) AS price,
        ROUND(LAG(Close, ${days}) OVER (ORDER BY marketdate), 2) as before_price
        FROM LKY.STOCKDATA
        WHERE ticker ='${stock}'
      )
    WHERE price IS NOT NULL AND before_price IS NOT NULL
    `,
        {},
        {
          fetchInfo: {
            MARKETDATE: { type: oracledb.STRING },
            PCT_CHANGE: { type: oracledb.DEFAULT },
          }
        }
      )
      .catch((err) => console.log("Percentage Change not Loaded.", err));

    console.log(`Percentage Data for ${stock}`, stockData);
    await _oracledb.close();
    console.log("Database Connection Closed.");

    return res.send({
      success: true,
      message: "Percentage Data",
      data: stockData
    })
  } else {
    return res.send({
      success: false,
      message: "No percentage data selected."
    })
  }
}

// NEED TO CHANGE--HAVE ONE ROW's MARKETDATE == BEFOREDATE
export const volumeChart = async (req, res) => {
  const { _oracledb } = req
  const { query } = req
  const { stock, days } = query

  // console.log('STOCK', stock)
  if (stock && days) {
    const stockData = await _oracledb
      .execute(
        `
    SELECT beforedate, marketdate, sum(volume) OVER(ORDER BY marketdate
      ROWS BETWEEN ${days - 1} PRECEDING AND CURRENT ROW)
      as volume_sum
      FROM (
        SELECT marketdate, volume, (LAG(marketdate, ${days}) OVER (ORDER BY marketdate)) as beforedate
        FROM LKY.StockData
        WHERE Ticker = '${stock}'
      )
      WHERE beforedate IS NOT NULL
    `,
        {},
        {
          fetchInfo: {
            MARKETDATE: { type: oracledb.STRING },
            BEFOREDATE: { type: oracledb.STRING },
            VOLUME_SUM: { type: oracledb.DEFAULT }
          }
        }
      )
      .catch((err) => console.log("Big error here: ", err))

    console.log(`Volume Data for ${stock}`, stockData)
    await _oracledb.close();
    console.log("Database Connection Closed.")

    if (!stockData) {
      return res.send({
        success: false,
        message: "Failed to get volume data",
        data: stockData
      })
    } else {
      return res.send({
        success: true,
        message: "Volume Data",
        data: stockData
      })
    }
  } else {
    return res.send({
      success: false,
      message: "No volume data selected"
    })
  }
}

export const stockPerfSector = async (req, res) => {
  const { _oracledb } = req
  const { query } = req
  const { stock, sector, days } = query

  if (stock && sector && days) {
    const stockData = await _oracledb
      .execute(
        `
        SELECT stockdate, pct_change_stock - pct_change_sector as difference
        FROM (
             SELECT marketdate AS stockdate, ROUND(((price - before_price) / before_price * 100), 2) AS pct_change_stock
             FROM (
                  SELECT marketdate, ROUND(close, 2) AS price,
                  ROUND(LAG(Close, ${days}) OVER (ORDER BY marketdate), 2) as before_price
                  FROM LKY.STOCKDATA
                  WHERE ticker ='${stock}'
                  )
              WHERE price IS NOT NULL AND before_price IS NOT NULL
              ),
           (
            SELECT ROUND(((price - before_price) / before_price * 100), 2) AS pct_change_sector, mktdate
            FROM (
                    SELECT price, mktdate, ROUND(LAG(price, ${days}) OVER (ORDER BY mktdate), 2) as before_price
                    FROM (
                        SELECT SECTOR, res.marketdate as mktdate, AVG(close) as price
                        FROM (
                            SELECT STOCKS.ticker, sector, marketdate, close
                            FROM STOCKS, STOCKDATA
                            WHERE STOCKS.Ticker = STOCKDATA.Ticker
                            ) res
                        GROUP BY SECTOR, res.marketdate
                        )
                    WHERE SECTOR = '${sector}'
                   )
            WHERE before_price IS NOT NULL)
        WHERE stockdate = mktdate
        ORDER BY stockdate ASC
    `,
        {},
        {
          fetchInfo: {
            STOCKDATE: { type: oracledb.STRING },
            DIFFERENCE: { type: oracledb.DEFAULT }
          }
        }
      )
      .catch((err) => console.log("Big error here: ", err))

    console.log(`Percentage Data for ${stock}`, stockData)
    await _oracledb.close()
    console.log("Database Connection Closed.")

    if (stockData) {
      return res.send({
        success: true,
        message: "Sector Comparison Data Loaded",
        data: stockData
      })
    }
  } else {
    return res.send({
      success: false,
      message: "No stock and sector data"
    })
  }
}

export const stockPerfIndex = async (req, res) => {
  const { _oracledb } = req
  const { query } = req
  const { stock, index, days } = query

  console.log('Loading Stock Performance Data Compared to ', index)
  if (stock && index && days) {
    const stockData = await _oracledb
      .execute(
        `
    SELECT stockdate, pct_change_stock - pct_change_index as pct_difference
    FROM (
      SELECT marketdate as indexdate, ROUND(((price - before_price) / before_price * 100), 2) AS pct_change_index
      FROM (
        SELECT marketdate, ROUND(close, 2) AS price,
        ROUND(LAG(close, ${days}) OVER (ORDER BY marketdate), 2) as before_price
        FROM LKY.STOCKINDEXDATA
        WHERE ticker ='${index}'
      )
      WHERE price IS NOT NULL AND before_price IS NOT NULL
    ),
      (
        SELECT marketdate AS stockdate, ROUND(((price - before_price) / before_price * 100), 2) AS pct_change_stock
        FROM (
          SELECT marketdate, ROUND(close, 2) AS price,
          ROUND(LAG(Close, ${days}) OVER (ORDER BY marketdate), 2) as before_price
          FROM LKY.STOCKDATA
          WHERE ticker ='${stock}'
        )
      WHERE price IS NOT NULL AND before_price IS NOT NULL
      )
    WHERE stockdate = indexdate
    `,
        {},
        {
          fetchInfo: {
            STOCKDATE: { type: oracledb.STRING },
            PCT_DIFFERENCE: { type: oracledb.DEFAULT }
          }
        }
      )
      .catch((err) => console.log('Error loading difference: ', err))

    console.log(`Stock Performance Index for ${stock}`, stockData)
    await _oracledb.close()
    console.log('Database Connection Closed.')

    return res.send({
      success: true,
      message: 'Retrieved Stock Performance Index',
      data: stockData
    })
  } else {
    return res.send({
      success: false,
      message: 'No stock and sector data'
    })
  }
}

export const dollarsTraded = async (req, res) => {
  const { _oracledb } = req
  const { query } = req
  const { stock } = query

  console.log('Dollars Traded Loading')
  if (stock) {
    const stockData = await _oracledb
      .execute(
        `
        SELECT marketdate, dollars_traded 
        FROM (
              SELECT marketdate, close, open, volume, ROUND(((close + open) * volume / 2), 2) AS dollars_traded
              FROM LKY.stockData
              WHERE ticker = '${stock}'
              )
        WHERE dollars_traded IS NOT NULL
      `,
        {},
        {
          fetchInfo: {
            MARKETDATE: { type: oracledb.STRING },
            DOLLARS_TRADED: { type: oracledb.DEFAULT }
          }
        }
      )
      .catch((err) => console.log("Dollars Traded not Loaded.", err))

    console.log(`Dollars Traded for ${stock}`, stockData)
    await _oracledb.close()

    return res.send({
      success: true,
      message: 'Dollars Traded',
      data: stockData
    })
  } else {
    return res.send({
      success: false,
      message: 'No dollars traded data selected.'
    })
  }
}

export const totalTuples = async (req, res) => {
  const { _oracledb } = req

  const stockData = await _oracledb.execute(`
    SELECT SUM(tbl.tblcount) as tuples
      FROM(
      (SELECT COUNT(*) as tblcount FROM STOCKDATA)
      UNION ALL
      (SELECT COUNT(*) as tblcount FROM STOCKS)
      UNION ALL
      (SELECT COUNT(*) as tblcount FROM STOCKINDEXDATA)
      UNION ALL
      (SELECT COUNT(*) as tblcount FROM STOCKINDEX)
      UNION ALL
      (SELECT COUNT(*) as tblcount FROM USER_ACCOUNT)
      UNION ALL
      (SELECT COUNT(*) as tblcount FROM GRAPH)
      UNION ALL
      (SELECT COUNT(*) as tblcount FROM FAVORITED_STOCKS)
    ) tbl
    `,
  {},
  {
    fetchInfo: {
      TUPLES: { type: oracledb.DEFAULT }
    }
  })
    .catch((err) => console.log('Total Tuples Failed to Load', err))

  console.log('Total Tuples in DB.', stockData)
  await _oracledb.close()

  if (stockData) {
    return res.send({
      success: true,
      message: 'Number of Tuples Loaded',
      data: stockData
    })
  } else {
    return res.send({
      success: false,
      message: 'Total Tuples not Loaded.'
    })
  }
}

export const getStockInfo = async (req, res) => {
  const { _oracledb } = req
  const { query } = req
  const { stock } = query

  const stockData = await _oracledb.execute(`
    SELECT Ticker, Name, Sector
    FROM Stocks
    WHERE Ticker = '${stock}'
  `,
  {},
  {
    fetchInfo: {
      TICKER: { type: oracledb.STRING },
      NAME: { type: oracledb.STRING },
      SECTOR: { type: oracledb.STRING }
    }
  })
  .catch((err) => console.log('Total Tuples Failed to Load', err))

  console.log('Stock Information', stockData)
  await _oracledb.close()

  if (stockData) {
    return res.send({
      success: true,
      message: 'Stock Information Loaded',
      data: stockData
    })
  } else {
    return res.send({
      success: false,
      message: 'Total Tuples not Loaded.'
    })
  }
}
