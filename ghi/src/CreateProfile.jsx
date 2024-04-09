<<<<<<< HEAD
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from './UserContext'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
=======
import { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserContext from './UserContext'

console.table(import.meta.env)

const API_HOST = import.meta.env.VITE_API_HOST
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8

import logo from './assets/FIFOFlow_transparent_x1.png'

export default function CreateProfile() {
<<<<<<< HEAD
    const { setUserData } = useUser()
=======
    const { setUserData } = useContext(UserContext)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
    const navigate = useNavigate()
    const location = useLocation()
    const { user_id, username, role_id, role_name } = location.state || {}

    const [profileData, setProfileData] = useState({
        user_id,
        role_id,
        role_name,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    })

    const [error, setError] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target
        setProfileData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
<<<<<<< HEAD
            const response = await fetch('http://localhost:8000/api/profile', {
=======
            const response = await fetch(`${API_HOST}profile`, {
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: profileData.user_id,
                    role: profileData.role_name,
                    first_name: profileData.first_name,
                    last_name: profileData.last_name,
                    email: profileData.email,
                    phone: profileData.phone,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Error details:', errorData)
                throw new Error(errorData.message || 'Failed to create profile')
            }

<<<<<<< HEAD
            const userDataResponse = await fetch(
                `http://localhost:8000/api/user/${username}`
            )
=======
            const userDataResponse = await fetch(`${API_HOST}user/${username}`)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8

            const userData = await userDataResponse.json()

            if (userDataResponse.ok) {
<<<<<<< HEAD
                localStorage.setItem(
                    'userData',
                    JSON.stringify({
                        user_id: userData.user_id,
                        username: userData.username,
                        role: userData.role,
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        email: userData.email,
                        phone: userData.phone,
                    })
                )
=======
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
                setUserData({
                    user_id: userData.user_id,
                    username: userData.username,
                    role: userData.role,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    phone: userData.phone,
<<<<<<< HEAD
=======
                    access_token: null,
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
                })
            }

            navigate('/home')
        } catch (error) {
            setError(error.message || 'An unknown error occurred')
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img className="logo" src={logo} alt="FIFOFlow Logo" />
                <h5 className="motto">
                    An open-source, automated system for managing your
                    logistical nightmares!
                </h5>
                <div className="signup-form-wrapper custom-shadow1">
                    <div>
                        <h2 className="account">Create an account</h2>
                        <Form onSubmit={handleFormSubmit}>
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}
                            <FloatingLabel
                                controlId="FloatingFirstName"
                                label="First Name"
                                className="mb-1"
                            >
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    className="form-control create-profile-input"
                                    placeholder="First Name"
                                    value={profileData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="FloatingLastName"
                                label="Last Name"
                                className="mb-1"
                            >
                                <input
                                    type="text"
                                    name="last_name"
                                    className="form-control create-profile-input"
                                    placeholder="Last Name"
                                    value={profileData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="FloatingFirstName"
                                label="Email"
                                className="mb-1"
                            >
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control create-profile-input"
                                    placeholder="Email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="FloatingFirstName"
                                label="Phone"
                                className="mb-1"
                            >
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control create-profile-input"
                                    placeholder="Phone"
                                    value={profileData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </FloatingLabel>
                            <Button
                                className="btn btn-outline-light mt-1"
                                variant="primary"
                                size="sm"
                                id="account-btn"
                                data-replace=""
                                type="submit"
                            >
                                Create Profile
                            </Button>
                        </Form>
                    </div>
                </div>
                <h6 className="terms">
                    By signing up, you agree to our <a href="#">Terms</a>,{' '}
                    <a href="#">Privacy Policy</a>, and{' '}
                    <a href="#">Cookies Policy</a>.
                </h6>
            </header>
        </div>
    )
}
