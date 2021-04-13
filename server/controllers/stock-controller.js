import oracledb from "oracledb";

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
      data: stockData,
    });
  } else {
    console.log("got here.");
    await _oracledb.close();
    return res.send({
      success: false,
      message: "failed getting stock",
    });
  }
};

export const getSMA = async (req, res) => {
  const { _oracledb } = req;
  const { query } = req;
  const { stock, days } = query;
  console.log("Attempting to Load SMA");
  if (stock) {
    console.log(stock);
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
          },
        }
      )
      .catch((err) => console.log("Simple Moving Average Not Loaded..", err));

    console.log(`SMA Data for ${stock}`, stockData);
    await _oracledb.close();
    console.log("Database Connection Closed.");

    return res.send({
      success: true,
      message: "Simple moving average",
      data: stockData,
    });
  } else {
    console.log("Stock was not loaded");
    return res.send({
      success: false,
      message: "Failed getting SMA",
    });
  }
};

export const percentChange = async (req, res) => {
  const { _oracledb } = req;
  const { query } = req;
  const { stock, days } = query;

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
          },
        }
      )
      .catch((err) => console.log("Percentage Change not Loaded.", err));

    console.log(`Percentage Data for ${stock}`, stockData);
    await _oracledb.close();
    console.log("Database Connection Closed.");

    return res.send({
      success: true,
      message: "Percentage Data",
      data: stockData,
    });
  } else {
    return res.send({
      success: false,
      message: "No percentage data selected.",
    });
  }
};

// NEED TO CHANGE--HAVE ONE ROW's MARKETDATE == BEFOREDATE
export const volumeChart = async (req, res) => {
  const { _oracledb } = req;
  const { query } = req;
  const { stock, days } = query;

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
            VOLUME_SUM: { type: oracledb.DEFAULT },
          },
        }
      )
      .catch((err) => console.log("Big error here: ", err));

    console.log(`Volume Data for ${stock}`, stockData);
    await _oracledb.close();
    console.log("Database Connection Closed.");

    if (!stockData) {
      return res.send({
        success: false,
        message: "Failed to get volume data",
        data: stockData,
      });
    } else {
      return res.send({
        success: true,
        message: "Volume Data",
        data: stockData,
      });
    }
  } else {
    return res.send({
      success: false,
      message: "No volume data selected",
    });
  }
};

export const stockPerfSector = async (req, res) => {
  const { _oracledb } = req;
  const { query } = req;
  const { stock, sector } = query;

  if (stock && sector) {
    const stockData = await _oracledb
      .execute(
        `

    `,
        {},
        {
          fetchInfo: {},
        }
      )
      .catch((err) => console.log("Big error here: ", err));

    console.log(`Percentage Data for ${stock}`, stockData);
    await _oracledb.close();
    console.log("Database Connection Closed.");
  } else {
    return res.send({
      success: false,
      message: "No stock and sector data",
    });
  }
};

export const stockPerfIndex = async (req, res) => {
  const { _oracledb } = req;
  const { query } = req;
  const { stock, sector } = query;

  if (stock && sector) {
    const stockData = await _oracledb
      .execute(
        `
    
    `,
        {},
        {
          fetchInfo: {},
        }
      )
      .catch((err) => console.log("Big error here: ", err));

    console.log(`Stock Performance Index for ${stock}`, stockData);
    await _oracledb.close();
    console.log("Database Connection Closed.");

    return res.send({
      success: true,
      message: "Retrieved Stock Performance Index",
    });
  } else {
    return res.send({
      success: false,
      message: "No stock and sector data",
    });
  }
};

export const dollarsTraded = async (req, res) => {
  const { _oracledb } = req;
  const { query } = req;
  const { stock } = query;

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
      .catch((err) => console.log("Dollars Traded not Loaded.", err));

    console.log(`Dollars Traded for ${stock}`, stockData);
    await _oracledb.close();

    return res.send({
      success: true,
      message: "Dollars Traded",
      data: stockData,
    });
  } else {
    return res.send({
      success: false,
      message: "No dollars traded data selected.",
    });
  }
};
