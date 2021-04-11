import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import SearchBar from './SearchBar.js'

const Header = () => {
    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Stockfly</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBar/>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header