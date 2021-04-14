import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'

class IndexSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange (e) {
    const target = document.getElementById('index_selector').value
    await this.setState({
      selected: target
    })
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
            <select class='form-control' id='index_selector' onChange={this.handleChange}>
              <option value=''>Index</option>
              <option value='^dji'>Dow Jones Industrial Average</option>
              <option value='^spx'>S&P 500</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default IndexSelector
