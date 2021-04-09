import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Navbar from 'react-bootstrap/Navbar'


class SearchBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stock: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name

    this.setState({ [name]: target.value })
  }

  handleSearch (e) {
    e.preventDefault()
    console.log(this.state.stock)
    this.props.handler(this.state.stock)
  }

  render () {
    return (
      <div className='stockInput'>
        <Navbar>
        <Navbar.Brand href="#home">Stockfly</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Form inline onSubmit={this.handleSearch}>
          <FormControl
            type='text'
            className="mr-sm-2"
            name='stock'
            value={this.state.stock}
            onChange={this.handleInputChange}
            placeHolder='Stock'
          />
           <Button onClick={this.handleSearch} variant="outline-success" type="submit">Search</Button>
           </Form>
           </Navbar.Collapse>
           </Navbar>
      </div>
    )
  }
}

export default SearchBar