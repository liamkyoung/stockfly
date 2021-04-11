import Header from "./Header"
import React from 'react'
import Graph from './Graph.js'
import { Navbar } from "react-bootstrap"
import NavBarLeft from "./NavBarLeft"
import SearchBar from './SearchBar.js'
import SMA from './SMA.js'
import SectorSelector from './SectorSelector.js'
import Percentages from './Percentages.js'

class Interface extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      stock: '',
      stockData: [],
      days: '',
      pDays: '',
      pActivated: false
    }
    this.getStock = this.getStock.bind(this)
    this.getSMA = this.getSMA.bind(this)
    this.getPercent = this.getPercent.bind(this)
  }

  getStock (stock) {
    this.setState({
      stock: stock
    })

    console.log('UPDATED STOCK', this.state.stock)
  }

  getSMA (days) {
    this.setState({
      days: days
    })
    console.log('SET DAYS', this.state.days)
  }

  getPercent (days, activated) {
    this.setState({
      pDays: days,
      pActivated: activated
    })
  }

  render () {
    return (
      <div className='front-page'>
        <SearchBar handler={this.getStock} />
        <NavBarLeft/>
        <SMA handler={this.getSMA} />
        <Percentages handler={this.getPercent} />
        <Graph stock={this.state.stock} days={this.state.days} pDays={this.state.pDays} pActive={this.state.pActivated} />
      </div>
    )
  }
}

export default Interface