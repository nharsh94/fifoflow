import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './Header'
import ErrorNotification from './ErrorNotification'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import CreateProduct from './CreateProduct'
import ProductsList from './ProductsList'
import TestProductCreate from './TestProductCreate'
import TestProductsList from './TestProductsList'
import Nav from './Nav'
import Construct from './Construct'
import UserPage from './UserPage'
import SignUpUserForm from './SignUpUserForm'
import ForgotPassword from './ForgotPassword'
import AssignRole from './AssignRole.jsx'
import CreateProfile from './CreateProfile'
import { UserProvider } from './UserContext'

console.table(import.meta.env)
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

function Navigation() {
    const location = useLocation()
    return location.pathname !== '/' && <Nav />
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
            <UserProvider>
                <div className="App">
                    <Header />
                    <Navigation />
                    <ErrorNotification error={error} />
                    <Routes>
                        <Route path="/" element={<Construct info={{}} />} />

                        <Route path="/user" element={<UserPage />} />
                        <Route path="/signup" element={<SignUpUserForm />} />
                        <Route path="/role" element={<AssignRole />} />
                        <Route path="/profile" element={<CreateProfile />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route path="/products">
                            <Route path="create" element={<CreateProduct />} />
                            <Route path="list" element={<ProductsList />} />
                        </Route>
                    </Routes>
                </div>
            </UserProvider>
        </BrowserRouter>
    )
}
export default App
