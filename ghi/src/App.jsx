// This makes VSCode check types as if you are using TypeScript
//@ts-check
import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ErrorNotification from './ErrorNotification'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import CreateProduct from './CreateProduct'
import ProductsList from './ProductsList'
import Nav from './Nav'
import Construct from './Construct'
import UserPage from './UserPage'
import SignUpForm from './SignUpForm'
import ForgotPassword from './ForgotPassword'
import ShopCreate from './ShopCreate'
import ShopsList from './ShopsList'
import OrderList from './list_orders'

// All your environment variables in vite are in this object
console.table(import.meta.env)

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

function App() {
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getData() {
            let url = `${API_HOST}/api/launch-details`
            console.log('fastapi url: ', url)
            let response = await fetch(url)

            if (response.ok) {
                console.log('Data fetched successfully!')
            } else {
                console.log('Error fetching data')
                setError('No fetched data')
            }
        }
        getData()
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <Nav />
                <ErrorNotification error={error} />
                <Routes>
                    <Route path="/" element={<Construct info={{}} />} />
                    <Route path="/orders" element={<OrderList />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/shops">
                        <Route path="create" element={<ShopCreate />} />
                        <Route path="list" element={<ShopsList />} />
                        {/* <Route path="details" element={<ShopDetails shopId={123} />} /> */}
                    </Route>
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/products">
                        <Route path="create" element={<CreateProduct />} />
                        <Route path="list" element={<ProductsList />} />
                    </Route>
                    {/* Define more routes as needed */}
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default App
