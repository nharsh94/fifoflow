import Nav from 'react-bootstrap/Nav'
import { useEffect } from 'react' // Add useState
import { useNavigate } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

import { NavLink } from 'react-router-dom'
import { UserProvider, useUser } from './UserContext'
import LogoutButton from './LogoutButton' // Import the LogoutButton component

function Navs() {
    const navigate = useNavigate()
    const { userData } = useUser() // Move userData declaration here

    useEffect(() => {
        // Redirect if user is not logged in or doesn't have admin role
        if (!userData || userData.role !== 'Admin') {
            navigate('/') // Example redirection to home page
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
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto" activeKey="/home">
                                <NavDropdown
                                    className="px-2"
                                    title="Orders"
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
                                    <NavDropdown.Divider />
                                    {userData &&
                                        userData.role === 'Admin' && ( // Only show "All Products" if user is admin
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
                                    <NavDropdown.Item as={NavLink} to="/user">
                                        User Database (Admin)
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/profile/list"
                                    >
                                        Profile Database
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/profile/supplier"
                                    >
                                        Create a Supplier (Admin)
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/profile/customer"
                                    >
                                        Create a Customer (Admin)
                                    </NavDropdown.Item>
                                    <NavDropdown.Item eventKey="4.2">
                                        Assign User Access (Admin Only)
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
                                                    style={{ color: 'white' }}
                                                >
                                                    {capitalizeFirstLetter(
                                                        userData.first_name
                                                    )}
                                                </strong>{' '}
                                                <strong
                                                    style={{ color: 'white' }}
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
