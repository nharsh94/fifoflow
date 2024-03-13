import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate

export default function SignUpForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
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

    return (
        <div className="container mt-5">
            <form onSubmit={handleFormSubmit}>
                {error && <div className="error">{error}</div>}
                <div className="mb-3">
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter username"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Send
                </button>
            </form>
        </div>
    )
}
