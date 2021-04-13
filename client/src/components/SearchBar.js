import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Navbar, Nav } from "react-bootstrap";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsGraphUp } from "react-icons/bs";
import Interface from "./Interface";
import StockInterface from "./StockInterface";
import Logo from "./StockFly.svg";

const SearchBar = (props) => {
  const [stock, setStock] = useState("");
  const [stockArr, setStockArr] = useState([]);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    setStock(target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(stock);
    const newArr = [...stockArr, stock];
    setStockArr(newArr);
    props.handler(stock);
    setStock("");
  };

  return (
    <div className="stockInput">
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
          </Nav>
          {stockArr.map((ticker) => (
            <div
              style={{
                "backgound-color": "#FFFFFF",
                "margin-right": 50,
                "font-color": "#FFF",
              }}
            >
              {ticker}
            </div>
          ))}
          <Form inline onSubmit={handleSearch}>
            <FormControl
              type="text"
              className="mr-sm-2"
              name="stock"
              value={stock}
              onChange={handleInputChange}
              placeHolder="add tickers to search"
            />
            <Button
              onClick={handleSearch}
              variant="outline-success"
              type="submit"
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default SearchBar;
