import Header from "./Header"
import React from 'react'
import Graph from './Graph.js'
import { Navbar } from "react-bootstrap"
import NavBarLeft from "./NavBarLeft"
import SearchBar from "./SearchBar"

class Interface extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      stock: ' ',
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
        <SearchBar handler={this.getStock} />
        <NavBarLeft/>
        <Graph stock={this.state.stock} />
      </div>
    )
  }
}

export default Interface