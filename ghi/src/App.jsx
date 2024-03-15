// This makes VSCode check types as if you are using TypeScript
//@ts-check
import React from 'react'
import { useState, useEffect } from 'react'
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

import useToken from './useToken'



// function Navigation({isLoggedIn}) {
//     const location = useLocation()
//     const showNavRoutes = ['/user', '/shops', '/products', '/orders']
//     const shouldShowNav = showNavRoutes.some((route) =>
//         location.pathname.startsWith(route)
//     )
//     return isLoggedIn && shouldShowNav ?<Nav isLoggedIn={isLoggedIn} /> : null
// }


function App() {
    const { token, setToken } = useToken()

    useEffect(() => {
        const isAuthenticated = () => {
            return localStorage.getItem('token') !== null
        }

        if (isAuthenticated()) {
            setToken(localStorage.getItem('token'))
        }
    }, [setToken])

    return (
        <BrowserRouter>
            <div className="App">
                {/* {isLoggedIn && <Nav isLoggedIn={isLoggedIn} />} */}
                <Nav isLoggedIn={token} />
                <Routes>
                    <Route path="/" element={<Construct />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/user" element={<UserPage />} />

                    <Route
                        path="/shops/*"
                        element={token ? <ShopRoutes /> : <Navigate to="/" />}
                    />

                    <Route path="/products">
                        <Route path="create" element={<CreateProduct />} />
                        <Route path="list" element={<ProductsList />} />

                        <Route
                            path="create1"
                            element={<TestProductCreate isLoggedIn={token} />}
                        />
                        <Route
                            path="list1"
                            element={<TestProductsList isLoggedIn={token} />}
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

    )
}

function ShopRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/shops/create" />} />
            <Route path="create" element={<ShopCreate />} />
            <Route path="list" element={<ShopsList />} />
            {/* Add more routes as needed */}
        </Routes>
    )
}
export default App
