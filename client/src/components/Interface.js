import React from 'react'
import Graph from './Graph.js'
import { Navbar, Button } from "react-bootstrap"
import SearchBar from './SearchBar.js'
import Option from './Option.js'
import SectorSelector from './SectorSelector.js'
import IndexSelector from './IndexSelector.js'

class Interface extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      isLoaded: false,
      stock: '',
      works: true,
      tuplesLoaded: false,

      smaDays: '',
      smaActive: false,

      pDays: '',
      pActive: false,

      vBucket: '',
      vActive: false,

      index: '',
      sector: '',
      compDays: '',
      compActive: false
    }
    this.getStock = this.getStock.bind(this)
    this.getSMA = this.getSMA.bind(this)
    this.getPercent = this.getPercent.bind(this)
    this.getVolume = this.getVolume.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleTuples = this.handleTuples.bind(this)
    this.getIndex = this.getIndex.bind(this)
    this.getSector = this.getSector.bind(this)
    this.getComparison = this.getComparison.bind(this)
  }

  async getStock (stock) {
    await this.setState({
      stock: stock
    })

    fetch('http://localhost:5000/api/getStockInfo/?stock=' + this.state.stock)
      .then(res => res.json())
      .then(stock => {
        if (stock.data.rows) {
          const stockData = stock.data.rows[0]
          const ticker = stockData[0]
          const name = stockData[1]
          const sector = stockData[2]
          const text = `${ticker.toUpperCase()} | ${name} | ${sector} `
          document.getElementById('title').textContent = text
        } else {
          const text = ''
          document.getElementById('title').textContent = text
        }
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

  getIndex (index) {
    this.setState({
      index: index,
      reset: false
    })
    console.log('Updated Index', this.state.index)
  }

  getSector (sector) {
    this.setState({
      sector: sector,
      reset: false
    })
    console.log('Updated Sector', this.state.sector)
  }

  getComparison (selected, days) {
    if (selected) {
      this.setState({
        compActive: true,
        compDays: days,
        reset: false
      })
    } else {
      this.setState({
        compActive: false,
        compDays: '',
        reset: false
      })
    }
    console.log('Comparison Days', this.state.compDays)
  }

  handleReset () {
    console.log('Reset')
    this.setState({
      stock: '',
      smaDays: '',
      smaActive: false,
      pDays: '',
      pActive: false,
      vBucket: '',
      vActive: false,
      reset: true,
      sector: '',
      index: '',
      tuplesLoaded: false
    })
    document.getElementById('tuples').textContent = ''
    document.getElementById('title').textContent = 'Graph'
  }

  handleTuples () {
    if (!this.state.tuplesLoaded) {
      fetch('http://localhost:5000/api/totalTuples')
        .then(res => res.json())
        .then(tuples => {
          const data = tuples.data.rows[0]
          const text = document.createTextNode(data)
          document.getElementById('tuples').appendChild(text)
        })
        .catch(err => console.log('Error loading tuples...', err))

      this.setState({
        tuplesLoaded: true
      })
    }
  }

  render () {
    return (
      <div className='front-page'>
        <SearchBar handler={this.getStock} reset={this.state.reset} /> <br />
        <div className='row'>
          <div className='col-4'>
            <h3>Queries</h3>
            <Option handler={this.getSMA} pHolder='Simple Moving Average Day Interval' reset={this.state.reset} />
            <Option handler={this.getPercent} pHolder='Percentage Change Day Interval' reset={this.state.reset} />
            <Option handler={this.getVolume} pHolder='Dollars Traded' reset={this.state.reset} /> <br />
            <Option handler={this.getComparison} pHolder='Index & Sector Day Interval' reset={this.state.reset} />
            <SectorSelector handler={this.getSector} reset={this.state.reset} />
            <IndexSelector handler={this.getIndex} reset={this.state.reset} />
            <Button variant='info' onClick={this.handleTuples}>Total Tuples</Button> <br />
            <h6 id='tuples' />
            <Button variant='danger' onClick={this.handleReset}>Reset</Button>
          </div>
          <div className='col-8'>
            <div className='row-c'>
              <h3 id='title'>Graph</h3>
            </div>
            {this.state.stock ?
              <Graph
                title={this.state.title}
                stock={this.state.stock}
                smaDays={this.state.smaDays}
                smaActive={this.state.smaActive}
                pDays={this.state.pDays}
                pActive={this.state.pActive}
                vActive={this.state.vActive}
                compDays={this.state.compDays}
                compActive={this.state.compActive}
                index={this.state.index}
                sector={this.state.sector}
              /> : <p>Nothing Loaded...</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default Interface
