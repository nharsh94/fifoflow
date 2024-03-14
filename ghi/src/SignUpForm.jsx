import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate

import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function SignUpForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const response = await fetch(
                'http://localhost:8000/api/user/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                }
            )

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to sign up')
            }

            // Assume the sign-up was successful if we reach this point
            navigate('/')
        } catch (error) {
            setError(error.message || 'An unknown error occurred') // Set the error state to display the error message
        }
    }

    // return (
    //     <div className="container mt-5">
    //         <form onSubmit={handleFormSubmit}>
    //             {error && <div className="error">{error}</div>}
    //             <div className="mb-3">
    //                 <input
    //                     type="text"
    //                     value={username}
    //                     onChange={(event) => setUsername(event.target.value)}
    //                     placeholder="Enter username"
    //                     required
    //                 />
    //             </div>
    //             <div className="mb-3">
    //                 <input
    //                     type="password"
    //                     value={password}
    //                     onChange={(event) => setPassword(event.target.value)}
    //                     placeholder="Enter Password"
    //                     required
    //                 />
    //             </div>
    //             <button type="submit" className="btn btn-primary">
    //                 Send
    //             </button>
    //         </form>
    //     </div>

return (
        <>
            <div>
                <h2>Create an account</h2>
                <Form
                    onSubmit={handleFormSubmit}
                    id="signup-form"
                    className="center-form"
                >
                    <div className="mb-3">
                        {error && <div className="error">{error}</div>}
                        <FloatingLabel
                            controlId="FloatingInput"
                            label="Username"
                            className="mb-3"
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
                            className="mb-3"
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
                        className="btn btn-outline-light"
                        variant="primary"
                        size="lg"
                        id="submit-btn"
                        data-replace=""
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </Form>
            </div>
        </>
    )
}
