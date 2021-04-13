import React from 'react'
import Graph from './Graph.js'
import { Navbar, Button } from "react-bootstrap"
import SearchBar from './SearchBar.js'
import Option from './Option.js'
import SectorSelector from './SectorSelector.js'

class Interface extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      stock: '',
      works: true,

      smaDays: '',
      smaActive: false,

      pDays: '',
      pActive: false,

      vBucket: '',
      vActive: false
    }
    this.getStock = this.getStock.bind(this)
    this.getSMA = this.getSMA.bind(this)
    this.getPercent = this.getPercent.bind(this)
    this.getVolume = this.getVolume.bind(this)
    this.resetButton = this.resetButton.bind(this)
  }

  async getStock (stock) {
    await this.setState({
      stock: stock
    })

    console.log('UPDATED STOCK', this.state.stock)
  }

  getSMA (selected, days) {
    if (selected) {
      this.setState({
        smaActive: selected,
        smaDays: days,
        reset: false
      })
    } else {
      this.setState({
        smaActive: selected,
        smaDays: '',
        reset: false
      })
    }
    console.log('Simple Moving Average Days', this.state.smaDays)
  }

  getPercent (selected, days) {
    if (selected) {
      this.setState({
        pActive: selected,
        pDays: days,
        reset: false
      })
    } else {
      this.setState({
        pActive: selected,
        pDays: '',
        reset: false
      })
    }
    console.log('Percentage Days', this.state.pDays)
  }

  getVolume (selected, days) {
    if (selected) {
      this.setState({
        vActive: selected,
        vBucket: days,
        reset: false
      })
    } else {
      this.setState({
        vActive: selected,
        vBucket: '',
        reset: false
      })
    }
    console.log('Volume Days', this.state.vBucket)
  }

  resetButton () {
    console.log('Reset')
    this.setState({
      stock: '',
      smaDays: '',
      smaActive: false,
      pDays: '',
      pActive: false,
      vBucket: '',
      vActive: false,
      reset: true
    })
  }

  render () {
    return (
      <div className='front-page'>
        <SearchBar handler={this.getStock} reset={this.state.reset} />
        <div className='col-3'>
          <h3>Queries</h3>
          <Option handler={this.getSMA} pHolder='SMA Days' reset={this.state.reset} />
          <Option handler={this.getPercent} pHolder='Percentage Change' reset={this.state.reset} />
          <Option handler={this.getVolume} pHolder='Volume' reset={this.state.reset} />
          <Option handler={() => console.log('No functionality yet.')} pHolder='Query 4' reset={this.state.reset} />
          <Option handler={() => console.log('No functionality yet.')} pHolder='Query 5' reset={this.state.reset} />
          <Button variant='danger' onClick={this.resetButton}>Reset</Button>
        </div>
        {this.state.stock ?
          <Graph
            stock={this.state.stock}
            smaDays={this.state.smaDays}
            smaActive={this.state.smaActive}
            pDays={this.state.pDays}
            pActive={this.state.pActivated}
            vBucket={this.state.vBucket}
            vActive={this.state.vActive}
          /> : <p>Nothing Loaded...</p>}
      </div>
    )
  }
}

export default Interface
