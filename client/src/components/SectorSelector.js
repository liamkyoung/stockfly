import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'

class SectorSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <Dropdown>
              <Dropdown.Toggle variant='success'>
                Sector
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="Communication Services">Communication Services</Dropdown.Item>
                <Dropdown.Item href="Consumer Cyclical">Consumer Cyclical</Dropdown.Item>
                <Dropdown.Item href="Consumer Defensive">Consumer Defensive</Dropdown.Item>
                <Dropdown.Item href="Consumer Discretionary">Consumer Discretionary</Dropdown.Item>
                <Dropdown.Item href="Consumer Staples">Consumer Staples</Dropdown.Item>
                <Dropdown.Item href="Energy">Energy</Dropdown.Item>
                <Dropdown.Item href="Entertainment">Entertainment</Dropdown.Item>
                <Dropdown.Item href="Financials">Financials</Dropdown.Item>
                <Dropdown.Item href="Health Care">Health Care</Dropdown.Item>
                <Dropdown.Item href="Industrials">Industrials</Dropdown.Item>
                <Dropdown.Item href="Information Technology">Information Technology</Dropdown.Item>
                <Dropdown.Item href="Materials">Materials</Dropdown.Item>
                <Dropdown.Item href="Real Estate">Real Estate</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    )
  }
}

export default SectorSelector
