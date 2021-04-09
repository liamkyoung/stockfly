import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

class Options extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      days: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const target = e.target
    const name = target.name

    this.setState({ [name]: target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.handler(this.state.days)
  }

  render () {
    return (
      <div className='container'>
        <div className='col-4 centered'>
          <InputGroup className="mb-3">
            <FormControl
              name='days'
              placeholder="SMA Days"
              aria-label="SMA Days"
              aria-describedby="basic-addon2"
              value={this.state.days}
              onChange={this.handleChange}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={this.handleSubmit}>Button</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    )
  }
}

export default Options
