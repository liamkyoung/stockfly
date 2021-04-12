import React from 'react'
import Graph from './Graph.js'
import { Navbar } from "react-bootstrap"
import SearchBar from './SearchBar.js'
import Options from './Options.js'

class Interface extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      stock: '',
      stockData: [],
      days: ''
    }
    this.getStock = this.getStock.bind(this)
    this.getSMA = this.getSMA.bind(this)
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

  render () {
    return (
      <div className='front-page'>
        <SearchBar handler={this.getStock} />
        <div>
           <Options handler={this.getSMA} />
        </div>
        <Graph stock={this.state.stock} days={this.state.days} />
      </div>
    )
  }
}

export default Interface