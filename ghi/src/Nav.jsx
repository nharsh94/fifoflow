import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

import { NavLink } from 'react-router-dom'

// import brand from './assets/FIFOFlow_transparent_x1.png'

function Navs() {
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container fluid>
                    {/* <Navbar.Brand as={NavLink} to="/">
                        <img
                            src={brand}
                            width="240"
                            height="56.8"
                            className="d-inline-block align-top"
                            alt="brand"
                        />
                    </Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav activeKey="/home">
                            <Nav.Item>
                                <Nav.Link
                                    className="px-3"
                                    as={NavLink}
                                    to="/home"
                                >
                                    Inventory
                                </Nav.Link>
                            </Nav.Item>
                            <NavDropdown
                                className="px-2"
                                title="Products"
                                id="nav-dropdown"
                            >
                                <NavDropdown.Item as={NavLink} to="/orders">
                                    All Orders
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/create-order"
                                >
                                    Create an Order
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                className="px-2"
                                title="Products"
                                id="nav-dropdown"
                            >
                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/products/create"
                                >
                                    Add Product To Flow
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/products/list"
                                >
                                    Product Database
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/products/details"
                                >
                                    Product Details
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="4.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                className="px-2"
                                title="Shops"
                                id="nav-dropdown"
                            >
                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/shops/create"
                                >
                                    Add Shop To Flow
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/shops/list">
                                    Shop Database
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.2">
                                    Shop Details
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="4.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                className="px-2"
                                title="User Management"
                                id="nav-dropdown"
                            >
                                <NavDropdown.Item as={NavLink} to="/shops/list">
                                    User Database
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.2">
                                    Assign User Access (Admin Only)
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/shops/create"
                                >
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
