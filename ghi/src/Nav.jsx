import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'

import { NavLink } from 'react-router-dom'

import brand from './assets/FIFOFlow_transparent_x1.png'

function Navs({ isLoggedIn }) {
    return (
        <>
            {isLoggedIn && (
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Container fluid>
                        <Navbar.Brand as={NavLink} to="/home">
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip id="button-tooltip-2">
                                        Return to Homepage
                                    </Tooltip>
                                }
                            >
                                <Button variant="dark">
                                    <img
                                        src={brand}
                                        width="240"
                                        height="56.8"
                                        className="d-inline-block align-top"
                                        alt="brand"
                                    />
                                </Button>
                            </OverlayTrigger>
                        </Navbar.Brand>
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
                                <Nav.Item>
                                    <Nav.Link
                                        className="px-3"
                                        as={NavLink}
                                        to="/api/orders"
                                    >
                                        Ordering
                                    </Nav.Link>
                                </Nav.Item>
                                <NavDropdown
                                    className="px-2"
                                    title="Orders"
                                    id="nav-dropdown"
                                >
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/orders/create-order"
                                    >
                                        Add Order To Flow
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/orders"
                                    >
                                        Orders List
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/orders/list"
                                    >
                                        Orders(WIP)
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/products/details"
                                    >
                                        Orders(WIP)
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item eventKey="4.4">
                                        Separated link
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
                                        to="/products/create1"
                                    >
                                        Add Product To Flow(Alt)
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/products/list"
                                    >
                                        Product Database
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/products/list1"
                                    >
                                        Product Database(Alt)
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
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/shops/list"
                                    >
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
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/role"
                                    >
                                       Assign Role (Admin Only)
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/profile/profile"
                                    >
                                        Create Profile (Admin Only)
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/home"
                                    >
                                        User Database (Admin Only)
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
            )}
        </>
    )
}
export default Navs
