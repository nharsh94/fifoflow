import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
<<<<<<< HEAD
import './HomePage.css'
import { useUser } from './UserContext'

function HomePage() {
    const { userData } = useUser()

=======
import UserContext from './UserContext'
import { useContext } from 'react'
import './HomePage.css'

function HomePage() {
    const { userData } = useContext(UserContext)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
    return (
        <div className="user-page">
            <h1>Welcome!</h1>
            <h2>
                <strong>
                    {userData.first_name} {userData.last_name}
                </strong>
            </h2>

            <div className="home-links">
                <Button
                    variant="primary"
                    className="home-button"
                    as={NavLink}
                    to="/products/list"
                >
                    <i className="fas fa-box-open"></i> Products
                </Button>
                <Button
                    variant="primary"
                    className="home-button"
                    as={NavLink}
                    to="/shops/list"
                >
                    <i className="fas fa-store"></i> Shops
                </Button>
                <Button
                    variant="primary"
                    className="home-button"
                    as={NavLink}
                    to="/user"
                >
                    <i className="fas fa-users"></i> Users
                </Button>
                <Button
                    variant="primary"
                    className="home-button"
                    as={NavLink}
                    to="/orders/list"
                >
                    <i className="fas fa-shopping-cart"></i> Orders
                </Button>
            </div>
        </div>
    )
}

export default HomePage
