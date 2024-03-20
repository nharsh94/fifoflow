import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'

export default function SignUpUserForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
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
            console.log('Response data:', data)

            if (data.user_id) {
                // Updated condition to check for user_id
                navigate('/role', {
                    state: { user_id: data.user_id, username: data.username },
                })
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
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    )
}
