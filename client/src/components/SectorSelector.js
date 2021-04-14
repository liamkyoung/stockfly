import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'

class SectorSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: '',
      changed: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange (e) {
    const target = document.getElementById('sector_selector').value
    await this.setState({
      selected: target
    })
    console.log('what is the state...', this.state.selected)
    this.props.handler(this.state.selected)
  }

  componentDidUpdate () {
    if (this.props.reset) {
      document.getElementById('sector_selector').value = ''
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <p>Compare To... </p>
          <div className='col-8'>
            <select id='sector_selector' class='form-control' onClick={this.handleChange}>
              <option value=''>Sector</option>
              <option value="Communication Services">Communication Services</option>
              <option value="Consumer Cyclical">Consumer Cyclical</option>
              <option value="Consumer Defensive">Consumer Defensive</option>
              <option value="Consumer Discretionary">Consumer Discretionary</option>
              <option value="Consumer Staples">Consumer Staples</option>
              <option value="Energy">Energy</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Financials">Financials</option>
              <option value="Health Care">Health Care</option>
              <option value="Industrials">Industrials</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Materials">Materials</option>
              <option value="Real Estate">Real Estate</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default SectorSelector
