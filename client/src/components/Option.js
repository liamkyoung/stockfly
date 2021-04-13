import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

class Options extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: false,
      days: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleChange (e) {
    const target = e.target
    const name = target.name

    await this.setState({ [name]: target.value })
    this.props.handler(this.state.selected, this.state.days)
  }

  async handleSubmit (e) {
    await this.setState({ selected: !this.state.selected })
    this.props.handler(this.state.selected, this.state.days)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.reset !== this.props.reset) {
      this.setState({
        days: ''
      })
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Checkbox
                aria-label='Checkbox for following text input'
                onChange={this.handleSubmit}
              />
            </InputGroup.Prepend>
            <FormControl
              name='days'
              aria-label='Text input with checkbox'
              placeholder={this.props.pHolder}
              onChange={this.handleChange}
              value={this.state.days}
            />
          </InputGroup>
        </div>
      </div>
    )
  }
}

export default Options
