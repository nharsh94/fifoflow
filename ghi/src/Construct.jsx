import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'react-json-pretty/themes/monikai.css'
import { useUser } from './UserContext'


import logo from './assets/FIFOFlow_transparent_x1.png'

function Construct() {
    const { setUserData } = useUser()
    const navigate = useNavigate()
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

            const authData = await response.json()
            console.log(authData)

            const profileResponse = await fetch(
                `http://localhost:8000/api/profile/${authData.id}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authData.access_token}`,
                    },
                }
            )

            if (!profileResponse.ok) {
                throw new Error('Failed to retrieve user profile')
            }

            const profileData = await profileResponse.json()

            localStorage.setItem(
                'userData',
                JSON.stringify({
                    user_id: authData.id,
                    username: authData.username,
                    first_name: profileData.first_name,
                    last_name: profileData.last_name,
                    role: profileData.role,
                })
            )

            setUserData({
                user_id: authData.id,
                username: authData.username,
                first_name: profileData.first_name,
                last_name: profileData.last_name,
                role: profileData.role,
            })

            console.log('Login successful:', authData)
            navigate('/home')
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
