<<<<<<< HEAD
import { useState } from 'react'
=======
import { useState, useContext } from 'react'
import UserContext from './UserContext'
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'react-json-pretty/themes/monikai.css'
<<<<<<< HEAD
import { useUser } from './UserContext'

import logo from './assets/FIFOFlow_transparent_x1.png'

function Construct() {
    const { setUserData } = useUser()
=======

import logo from './assets/FIFOFlow_transparent_x1.png'

console.table(import.meta.env)

const API_HOST = import.meta.env.VITE_API_HOST

function Construct() {
    const { setUserData } = useContext(UserContext)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!username || !password) {
            alert('Please enter both username and password.')
            return
        }

        try {
<<<<<<< HEAD
            const response = await fetch(
                'http://localhost:8000/api/user/token',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        username,
                        password,
                        grant_type: 'password',
                        scope: 'read write',
                    }),
                }
            )
=======
            const response = await fetch(`${API_HOST}user/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username,
                    password,
                    grant_type: 'password',
                    scope: 'read write',
                }),
            })
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
            if (!response.ok) {
                throw new Error('Login failed')
            }

            const authData = await response.json()

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
                        access_token: authData.access_token,
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
                    access_token: authData.access_token,
                })
            }
            navigate('/home')
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img className="logo" src={logo} alt="FIFOFlow Logo" />
                    <h5 className="motto">
                        An open-source, automated system for managing your
                        logistical nightmares!
                    </h5>
                    <div className="signup-form-wrapper custom-shadow1">
                        <Form
                            id="user_login"
                            className="user"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-3">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Username"
                                    className="mb-1 custom-shadow"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Password"
                                    className="mb-1 custom-shadow"
                                >
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </FloatingLabel>
                            </div>
                            <Button
                                className="btn btn-lg"
                                variant="primary"
                                id="account-btn"
                                data-replace=""
                                type="submit"
                            >
                                Log in
                            </Button>{' '}
                        </Form>
                    </div>
                    <div className="side-by-side-buttons">
                        <button
                            className="btn btn-link"
                            id="forgot-password-btn"
                        >
                            <Link to="/forgot-password">Forgot password?</Link>
                        </button>
                        <button
                            className="btn btn-link"
                            id="create-account-btn"
                        >
                            <Link to="/signup">Sign up</Link>
                        </button>
                    </div>
                </header>
            </div>
        </>
    )
}

export default Construct
