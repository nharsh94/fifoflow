import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';

// import brand from './FIFOFlow_x_stamp.png';
import brand from './assets/FIFOFlow_transparent_x1.png';

function Navs() {

    return (
        <>
            <Navbar className="bg-body-tertiary" expand="lg">
                {/* <Container className="d-flex justify-content-between align-items-center"> */}
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src={brand}
                            width="240"
                            height="56.8"
                            className="d-inline-block align-top"
                            alt="brand"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav activeKey="1">
                            <Nav.Item>
                                <Nav.Link eventKey="1" href="#/home">
                                    InVentory Management
                                </Nav.Link>
                            </Nav.Item>
                            <NavDropdown
                                title="Order Management"
                                id="nav-dropdown"
                            >
                                <NavDropdown.Item as={Link} to="/orders">
                                    All Orders
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item>
                                <Nav.Link eventKey="3" title="/api/products">
                                    Product Management
                                </Nav.Link>
                            </Nav.Item>
                            <NavDropdown
                                title="Shop Management"
                                id="nav-dropdown"
                            >
                                <NavDropdown.Item as={Link} to="/shops/list">
                                    Shop Database
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.2">
                                    Shop Details
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/shops/create">
                                    Add Shop To Flow
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="4.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                title="User Management"
                                id="nav-dropdown"
                            >
                                <NavDropdown.Item as={Link} to="/shops/list">
                                    User Database
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.2">
                                    Assign User Access (Admin Only)
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/shops/create">
                                    Register User (Admin Only)
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="4.4">
                                    Admin
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Navs
