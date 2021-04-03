export const getStock = async (req, res) => {
  console.log('here2')
  const { stock } = req.params
  if (stock) {
    console.log(stock)
    return res.send({
      success: true,
      stock: stock
    })
  } else {
    console.log('got here.')
    return res.send({
      success: false,
      message: 'failed getting stock'
    })
  }
}

export const getSector = async (req, res) => {
  // console.log('here2')
  console.log(req._oracledb)
  const result = await req._oracledb.execute(`
    SELECT sector
    FROM stock
    WHERE ticker = 'AFL'`)

  console.log(result)
}
