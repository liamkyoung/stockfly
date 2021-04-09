import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import SearchBar from './SearchBar.js'

const stockHeader = () => {
    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Stockfly</Navbar.Brand>
            </Navbar>
        </header>
    )
}

export default stockHeader