import React from 'react'
import { useState, useEffect } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    Navigate,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Nav from './Nav'
import ErrorNotification from './ErrorNotification'
import { UserProvider } from './UserContext'
{
    /* Authentication Routes */
}
import Construct from './Construct'
import SignUpUserForm from './SignUpUserForm'
import ForgotPassword from './ForgotPassword'
{
    /* User Routes */
}
import HomePage from './HomePage'
import UsersList from './UsersList'
import CreateSupplier from './CreateSupplier'
import AssignRole from './AssignRole.jsx'
import CreateProfile from './CreateProfile'
import ProfileDatabase from './ProfileDatabase'
import CreateCustomer from './CreateCustomer'
{
    /* Shop Routes */
}
import ShopCreate from './ShopCreate'
import ShopsList from './ShopsList'
import ShopDetails from './ShopDetails'
{
    /* Product Routes */
}
import CreateProduct from './CreateProduct'
import ProductsList from './ProductsList'
import AllProducts from './AllProducts'
{
    /* Order Routes */
}
import OrderList from './OrderList'
import OrderCreate from './OrderCreate'
import OrderHistory from './OrderHistory'
{
    /* Demo Routes */
}
import SignUpForm from './TestSignUpForm'


function Navigation({ isLoggedIn }) {
    const location = useLocation()
    const showNavRoutes = ['/home', 'profile', '/user', '/shops', '/products', '/orders']
    const shouldShowNav =
        isLoggedIn &&
        (showNavRoutes.some((route) => location.pathname.startsWith(route)) ||
            (location.pathname !== '/' &&
                location.pathname !== '/signup' &&
                location.pathname !== '/role' &&
                location.pathname !== '/profile'))

    return isLoggedIn && shouldShowNav ? <Nav isLoggedIn={isLoggedIn} /> : null
}

function App() {
    const [error, setError] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

    useEffect(() => {
        const isAuthenticated = () => {
            // return localStorage.getItem('token') !== null
            return true
        }

        try {
            setError(null)
            setIsLoggedIn(isAuthenticated())
        } catch (error) {
            setError(error.message)
        }
    }, [])

    return (
        <>
            <UserProvider>
                <BrowserRouter>
                    <div className="App">
                        <Navigation isLoggedIn={isLoggedIn} />
                        <ErrorNotification error={error} />
                        <Routes>
                            <Route path="/" element={<Construct />} />
                            {/* Authentication Routes */}
                            <Route
                                path="/signup"
                                element={<SignUpUserForm />}
                            />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPassword />}
                            />
                            {/* User Routes */}
                            <Route
                                path="/home"
                                element={<HomePage isLoggedIn={isLoggedIn} />}
                            />
                            <Route path="/user" element={<UsersList />} />
                            <Route path="/role" element={<AssignRole />} />
                            <Route path="/user" element={<UsersList />} />
                            <Route path="profile">
                                <Route
                                    path="/profile"
                                    element={<CreateProfile />}
                                />
                                <Route
                                    path="/profile/list"
                                    element={<ProfileDatabase />}
                                />
                                <Route
                                    path="/profile/supplier"
                                    element={<CreateSupplier />}
                                />
                                <Route
                                    path="/profile/customer"
                                    element={<CreateCustomer />}
                                />
                            </Route>

                            {/* Shops Routes */}
                            <Route path="/shops">
                                <Route
                                    path="create"
                                    element={
                                        <ShopCreate isLoggedIn={isLoggedIn} />
                                    }
                                />
                                <Route
                                    path="list"
                                    element={
                                        <ShopsList />
                                    }
                                />
                                <Route
                                    path="details"
                                    element={
                                        <ShopDetails />
                                    }
                                />
                            </Route>
                            {/* Products Routes */}
                            <Route path="/products">
                                <Route
                                    path="create"
                                    element={<CreateProduct />}
                                />
                                <Route path="list" element={<ProductsList />} />
                                <Route path="all" element={<AllProducts />} />
                                {/* Demo Routes */}
                                <Route
                                    path="signup1"
                                    element={<SignUpForm />}
                                />
                            </Route>
                            {/* Orders Routes */}
                            <Route path="/orders">
                                <Route path="list" element={<OrderList />} />
                                <Route
                                    path="create"
                                    element={<OrderCreate />}
                                />
                                <Route
                                    path="history"
                                    element={<OrderHistory />}
                                />
                            </Route>
                            {/* Default Redirect */}
                            <Route
                                path="/"
                                element={<Navigate to="/construct" replace />}
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
            </UserProvider>
        </>
    )
}
export default App
