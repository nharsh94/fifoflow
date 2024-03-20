import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from './UserContext'

import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import logo from './assets/FIFOFlow_transparent_x1.png'


export default function SignUpForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { setUserId } = useUser()
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch(
                'http://localhost:8000/api/user/signup',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                }
            )

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.detail || 'Failed to sign up')
            }

            const data = await response.json()
            console.log(data)

            if (data.id) {
                setUserId(data.id)
                navigate('/role', { state: { user_id: data.id } })
            } else {
                throw new Error('User ID not found in response')
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }


return (
    <div className="App">
        <header className="App-header">
            <img className="logo" src={logo} alt="FIFOFlow Logo" />
            <h5 className="motto">
                An open-source, automated system for managing your logistical
                nightmares!
            </h5>
            <div className="signup-form-wrapper custom-shadow1">
                <div>
                    <h2 className="account">Create an account</h2>
                    <Form
                        onSubmit={handleSubmit}
                        {...(error && (
                            <div className="alert alert-danger">{error}</div>
                        ))}
                        id="signup-form"
                        className="center-form"
                    >
                        <div className="mb-3">
                            {error && <div className="error">{error}</div>}
                            <FloatingLabel
                                controlId="FloatingInput"
                                label="Username"
                                className="mb-1 custom-shadow"
                            >
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                    placeholder="Enter username"
                                    required
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="FloatingPassword"
                                label="Password"
                                className="mb-1 custom-shadow"
                            >
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Enter Password"
                                    required
                                />
                            </FloatingLabel>
                        </div>
                        <Button
                            className="btn btn-outline-light mt-1"
                            variant="primary"
                            size="lg"
                            id="account-btn"
                            data-replace=""
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
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
