import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'react-json-pretty/themes/monikai.css'

import logo from './assets/FIFOFlow_transparent_x1.png'
import useToken from './useToken'

function Construct() {
    const navigate = useNavigate()
    const { setToken } = useToken();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            alert('Please enter both username and password.')
            return
        }

        try {
            const response = await fetch(
                'http://localhost:8000/api/user/signin',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                }
            )
            if (!response.ok) {
                throw new Error('Login failed')
            }

            const data = await response.json()
            console.log('Login successful:', data)
            setToken(true)
            navigate('/user')
        } catch (error) {
            if (error instanceof TypeError) {
                console.error('Network error:', error)
            } else {
                console.error('Login error:', error)
            }
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
                        <div className="form-wrapper">
                            <Form id="user_login" onSubmit={handleSubmit}>
                                <div className="mb-1">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Username"
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
                                    <Button
                                        className="btn btn-md"
                                        variant="primary"
                                        id="login-btn"
                                        data-replace=""
                                        type="submit"
                                    >
                                        Log in
                                    </Button>{' '}
                                </div>
                            </Form>
                                <div className="side-by-side-buttons">
                                    <button
                                        className="btn btn-link"
                                        id="forgot-password-btn"
                                    >
                                        <Link to="/forgot-password">
                                            Forgot password?
                                        </Link>
                                    </button>
                                    <button
                                        className="btn btn-link"
                                        id="create-account-btn"
                                    >
                                        <Link to="/signup">Sign up</Link>
                                    </button>
                                </div>
                        </div>
                    </header>
                </div>
        </>
    )
}

export default Construct
