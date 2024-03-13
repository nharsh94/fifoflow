import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'react-json-pretty/themes/monikai.css'

function Construct({ info }) {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    if (!info) {
        return (
            <div className="App">
                <header className="App-header">
                    <p>Loading...</p>
                </header>
            </div>
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!username || !password) {
            alert('Please enter both username and password.')
            return // Exit early if validation fails
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
            navigate('/user')
        } catch (error) {
            if (error instanceof TypeError) {
                console.error('Network error:', error)
            } else {
                console.error('Login error:', error)
            }
            // Handle login error here (e.g., showing an error message)
        }
    }

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <h5 className="motto">
                        An open-source, automated system for managing your
                        logistical nightmares!
                    </h5>
                    <Form id="user_login" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="User Login"
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
                        </div>
                        <Button
                            className="btn btn-lg"
                            variant="primary"
                            id="login-btn"
                            data-replace=""
                            type="submit"
                        >
                            Log in
                        </Button>{' '}
                    </Form>
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
