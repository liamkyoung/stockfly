import React from 'react'

class SearchBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stock: ''
    }
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name

    this.setState({ [name]: target.value })
  }

  render () {
    return (
      <div className='stockInput'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='stock'
            value={this.state.stock}
            onChange={this.handleInputChange}
            placeHolder='Stock'
          />
          <input
            type='submit'
            class='btn btn-primary'
            value='Submit'
          />
        </form>
      </div>
    )
  }
}

export default SearchBar
