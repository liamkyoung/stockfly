import { Navbar, Nav } from "react-bootstrap";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsGraphUp } from "react-icons/bs";
import Interface from "./Interface";
import StockInterface from "./StockInterface";

const NavBarLeft = () => {
  return (
    <Navbar>
      <Nav defaultActiveKey="/home" className="flex-column">
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
    </Navbar>
  );
};

export default NavBarLeft;
