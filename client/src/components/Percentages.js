import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

class Percentages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pDays: '',
      on: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleInput (e) {
    const target = e.target
    const name = target.name

    this.setState({ [name]: target.value })
    console.log(target.value)
  }

  async handleToggle () {
    await this.setState(prevState => ({ on: !prevState.on }))
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.handler(this.state.pDays, this.state.on)
  }

  render () {
    return (
      <div className='container'>
        <div className='col-3'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Check
              onChange={this.handleToggle}
              label='Percentage Change'
              value={this.state.on}
            />
            <Form.Control
              onChange={this.handleInput}
              placeholder='Days'
              name='pDays'
              value={this.state.pDays}
            /> <Button type='submit'> Enter </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Percentages
