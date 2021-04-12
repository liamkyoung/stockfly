import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { Navbar, Nav } from "react-bootstrap"
import { BsFillHouseDoorFill } from "react-icons/bs"
import { BsGraphUp } from "react-icons/bs"
import Interface from "./Interface"
import StockInterface from "./StockInterface"
import Logo from "./StockFly.svg"

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
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">
            <img
              width="150"
              height="50"
              className="d-inline-block align-top"
              src={Logo}
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav defaultActiveKey="/home" className="mr-auto">
            <Nav.Item>
              <Nav.Link href="/home" Component={Interface}>
                <BsFillHouseDoorFill size="30px" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/stock" Component={StockInterface}>
                <BsGraphUp size="30px" />
              </Nav.Link>
            </Nav.Item>
          </Nav>
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