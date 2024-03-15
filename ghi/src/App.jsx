// This makes VSCode check types as if you are using TypeScript
//@ts-check
import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// import Header from './Header'
import Nav from './Nav'

import Construct from './Construct'
// import SignUpUserForm from './SignUpUserForm'
import SignUpForm from './SignUpForm'
import ForgotPassword from './ForgotPassword'
// import AssignRole from './AssignRole.jsx'
// import CreateProfile from './CreateProfile'
// import { UserProvider } from './UserContext'

import UserPage from './UserPage'

import ShopCreate from './ShopCreate'
import ShopsList from './ShopsList'

import CreateProduct from './CreateProduct'
import ProductsList from './ProductsList'

import OrderList from './list_orders'
// import OrderCreate from './order_form'

//
import TestProductCreate from './TestProductCreate' // By Mel K
import TestProductsList from './TestProductsList' // By Mel K
// import ProductDetails from './ProductDetails'



function Navigation({isLoggedIn}) {
    const location = useLocation()
    const showNavRoutes = ['/user', '/shops', '/products', '/orders']
    const shouldShowNav = showNavRoutes.some((route) =>
        location.pathname.startsWith(route)
    )
    // return location.pathname !== '/' && <Nav isLoggedIn={isLoggedIn} />
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
                <div className="App">
                    {/* {isLoggedIn && <Nav isLoggedIn={isLoggedIn} />} */}
                    <Navigation isLoggedIn={isLoggedIn} />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Construct
                                    setIsLoggedIn={setIsLoggedIn}
                                    isLoggedIn={isLoggedIn}
                                />
                            }
                        />

                        <Route path="/signup" element={<SignUpForm />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="/user"
                            element={<UserPage isLoggedIn={isLoggedIn} />}
                        />

                        <Route path="/shops">
                            <Route
                                path="create"
                                element={<ShopCreate isLoggedIn={isLoggedIn} />}
                            />
                            <Route
                                path="list"
                                element={<ShopsList isLoggedIn={isLoggedIn} />}
                            />
                            {/* <Route
                                path="details"
                                element={<ShopDetails isLoggedIn={isLoggedIn}/>} /> */}
                        </Route>

                        <Route path="/products">
                            <Route path="create" element={<CreateProduct />} />
                            <Route path="list" element={<ProductsList />} />

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
                                    <TestProductsList isLoggedIn={isLoggedIn} />
                                }
                            />
                        </Route>

                        <Route path="/orders" element={<OrderList />} />
                        <Route
                            path="/"
                            element={<Navigate to="/construct" replace />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}
export default App
