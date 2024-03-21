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

function Navs() {
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
                <Navbar bg="dark" expand="xl" variant="dark">
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
                                        Add To Flow
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/orders/list"
                                    >
                                        Database
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/orders/history"
                                    >
                                        History
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
                                        Add To Flow
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/products/list"
                                    >
                                        Database
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/products/details"
                                    >
                                        Details
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {userData && userData.role === 'Admin' && (
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/products/all"
                                        >
                                            All Products
                                        </NavDropdown.Item>
                                    )}
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
                                        Add To Flow
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/shops/list"
                                    >
                                        Database
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown
                                    className="px-2"
                                    title="User Management"
                                    id="nav-dropdown"
                                    disabled={
                                        userData && userData.role !== 'Admin'
                                    }
                                >
                                    {userData && userData.role === 'Admin' && (
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/user"
                                        >
                                            User Database (Admin)
                                        </NavDropdown.Item>
                                    )}
                                    {userData && userData.role === 'Admin' && (
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/profile/list"
                                        >
                                            Profile Database (Admin)
                                        </NavDropdown.Item>
                                    )}
                                    {userData && userData.role === 'Admin' && (
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/profile/customer"
                                        >
                                            Add a Customer (Admin)
                                        </NavDropdown.Item>
                                    )}
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/home/user"
                                    >
                                        User Database (Admin)
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item disabled>
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
            </UserProvider>
        </>
    )
}
export default Navs
