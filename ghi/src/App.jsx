// This makes VSCode check types as if you are using TypeScript
//@ts-check
import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Nav from './Nav'

{/* Authentication Routes */}
import Construct from './Construct'
import SignUpUserForm from './SignUpUserForm'
import ForgotPassword from './ForgotPassword'

{/* User Routes */}
import AssignRole from './AssignRole.jsx'
import CreateProfile from './CreateProfile'
import HomePage from './HomePage'
import UsersList from './UsersList'
import { UserProvider } from './UserContext'

{/* Shop Routes */}
import ShopCreate from './ShopCreate'
import ShopsList from './ShopsList'
import ShopDetails from './ShopDetails'

{/* Product Routes */}
import CreateProduct from './CreateProduct'
import ProductsList from './ProductsList'

{/* Order Routes */}
import OrderList from './list_orders'
import OrderCreate from './order_form'

{/* Demo Routes */}
import SignUpForm from './SignUpForm'
import TestProductCreate from './TestProductCreate' // By Mel K
import TestProductsList from './TestProductsList' // By Mel K



function Navigation({isLoggedIn}) {
    const location = useLocation()
    const showNavRoutes = ['/home', '/user', '/shops', '/products', '/orders']
    const shouldShowNav = showNavRoutes.some((route) =>
        location.pathname.startsWith(route)
    )
    return isLoggedIn && shouldShowNav ?<Nav isLoggedIn={isLoggedIn} /> : null
}


function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    useEffect(() => {
        const isAuthenticated = () => {
            return localStorage.getItem('token') !== null
        }

        setIsLoggedIn(isAuthenticated())
    }, [])


    return (
        <>
            <BrowserRouter>
                <UserProvider>
                    <div className="App">
                        <Navigation isLoggedIn={isLoggedIn} />
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
                            <Route path="/role" element={<AssignRole />} />
                            <Route path="/user" element={<UsersList />} />
                            <Route
                                path="/profile"
                                element={<CreateProfile />}
                            />

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
                                        <ShopsList isLoggedIn={isLoggedIn} />
                                    }
                                />
                                <Route
                                    path="details"
                                    element={
                                        <ShopDetails isLoggedIn={isLoggedIn} />
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
                                {/* Demo Routes */}
                            <Route path="signup1" element={<SignUpForm />} />
                                <Route
                                    path="create1"
                                    element={
                                        <TestProductCreate
                                            isLoggedIn={isLoggedIn}
                                        />
                                    }
                                />
                                <Route
                                    path="list1"
                                    element={
                                        <TestProductsList
                                            isLoggedIn={isLoggedIn}
                                        />
                                    }
                                />
                            </Route>
                            {/* Orders Routes */}
                            <Route path="/orders" element={<OrderList />} />
                            <Route
                                path="/create-order"
                                element={<OrderCreate />}
                            />
                            <Route
                                path="/list"
                                element={<OrderCreate />}
                            />

                            {/* Default Redirect */}
                            <Route
                                path="/"
                                element={<Navigate to="/construct" replace />}
                            />
                        </Routes>
                    </div>
                </UserProvider>
            </BrowserRouter>
        </>
    )
}
export default App
