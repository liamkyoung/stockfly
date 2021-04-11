import stockHeader from "./stockHeader"
import React from 'react'
import Graph from './Graph.js'
import { Navbar } from "react-bootstrap"
import NavBarLeft from "./NavBarLeft"

class StockInterface extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      stock: '',
      stockData: []
    }
    this.getStock = this.getStock.bind(this)
  }

  getStock = stock => {
    this.setState({
      stock: stock
    })

    console.log('UPDATED STOCK')
  }

  render () {
    return (
      <div className='front-page'>
        <stockHeader/>
        <NavBarLeft/>
      </div>
    )
  }
}

export default StockInterface