import Nav from 'react-bootstrap/Nav'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import LogoutButton from './LogoutButton'

import { NavLink } from 'react-router-dom'
import { UserProvider, useUser } from './UserContext'

import brand from './assets/FIFOFlow_transparent_x1.png'

function Navs({ isLoggedIn }) {
    const navigate = useNavigate()
    const { userData } = useUser()

    useEffect(() => {
        if (!userData) {
            navigate('/')
        }
    }, [userData, navigate])

    const handleLogin = () => {
        navigate('/login')
    }

    const capitalizeFirstLetter = (string) => {
        if (!string) return ''
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <>
            <UserProvider>
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
                                    <NavDropdown
                                        className="px-2"
                                        title="Orders"
                                        id="nav-dropdown"
                                    >
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/orders/create"
                                        >
                                            Add Order To Flow
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/orders/list"
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
                                            {userData &&
                                                userData.role === 'Admin' && (
                                                    <NavDropdown.Item
                                                        as={NavLink}
                                                        to="/products/all"
                                                    >
                                                        All Products
                                                    </NavDropdown.Item>
                                                )}
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
                                        {userData &&
                                            userData.role === 'Admin' && (
                                                <NavDropdown.Item
                                                    as={NavLink}
                                                    to="/profile/supplier"
                                                >
                                                    Create a Supplier (Admin)
                                                </NavDropdown.Item>
                                            )}
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
                                <Nav className="d-flex ms-auto order-5">
                                    {userData ? (
                                        <NavDropdown
                                            className="dropdown-menu-right"
                                            title={
                                                <span>
                                                    Welcome{' '}
                                                    <strong
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    >
                                                        {capitalizeFirstLetter(
                                                            userData.first_name
                                                        )}
                                                    </strong>{' '}
                                                    <strong
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    >
                                                        {capitalizeFirstLetter(
                                                            userData.last_name
                                                        )}
                                                    </strong>
                                                </span>
                                            }
                                            id="user-dropdown"
                                        >
                                            <NavDropdown.Item
                                                as={NavLink}
                                                to="/profile"
                                            >
                                                Profile
                                            </NavDropdown.Item>
                                            <NavDropdown.Item>
                                                <LogoutButton />
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    ) : (
                                        <Nav.Link onClick={handleLogin}>
                                            Login
                                        </Nav.Link>
                                    )}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                )}
            </UserProvider>
        </>
    )
}
export default Navs
