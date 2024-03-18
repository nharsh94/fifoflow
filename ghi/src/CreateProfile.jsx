import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from './UserContext'

export default function CreateProfile() {
    const { userData, setUserData } = useUser()
    console.log('I am being logged', userData)
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

    console.log(profileData)
    const [error, setError] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target
        setProfileData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/api/profile', {
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

            const responseData = await response.json()
            // Save all relevant data to local storage
            localStorage.setItem(
                'userData',
                JSON.stringify({
                    user_id: user_id,
                    username: username,
                    first_name: responseData.first_name,
                    last_name: responseData.last_name,
                    role: role_name,
                })
            )

            // Update state or context with the newly created profile data
            setUserData({
                user_id: user_id,
                username: username,
                first_name: responseData.first_name,
                last_name: responseData.last_name,
                role: role_name,
            })

            navigate('/home') // Navigate to the dashboard
        } catch (error) {
            setError(error.message || 'An unknown error occurred')
        }
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleFormSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <input
                        type="text"
                        name="first_name"
                        className="form-control create-profile-input"
                        placeholder="First Name"
                        value={profileData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="last_name"
                        className="form-control create-profile-input"
                        placeholder="Last Name"
                        value={profileData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        className="form-control create-profile-input"
                        placeholder="Email"
                        value={profileData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="phone"
                        className="form-control create-profile-input"
                        placeholder="Phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-create-profile"
                >
                    Create Profile
                </button>
            </form>
        </div>
    )
}
