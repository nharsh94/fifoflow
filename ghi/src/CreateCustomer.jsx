import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CreateSupplierProfile() {
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [selectedUserId, setSelectedUserId] = useState('')
    const [profileData, setProfileData] = useState({
        role: 'Customer',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    })
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8000/api/user/list'
                )
                if (!response.ok) throw new Error('Failed to fetch users')
                const data = await response.json()
                console.log('Fetched users:', data)
                setUsers(data)
            } catch (error) {
                setError('Failed to fetch users. Please try again later.')
                console.error('Error fetching users:', error)
            }
        }

        fetchUsers()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setProfileData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleUserChange = (event) => {
        setSelectedUserId(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const requestData = { ...profileData, user_id: selectedUserId }

        try {
            const response = await fetch('http://localhost:8000/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Error details:', errorData)
                throw new Error(
                    errorData.message || 'Failed to create customer profile'
                )
            }

            toast.success('Customer successfully added!')

            navigate('/home')
        } catch (error) {
            setError(error.message || 'An unknown error occurred')
        }
    }

    return (
        <div className="container mt-5">
            <h1>Create a Customer</h1>
            <Form onSubmit={handleFormSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <select
                        className="form-select"
                        value={selectedUserId}
                        onChange={handleUserChange}
                        required
                    >
                        <option value="">Select a User</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="first_name"
                        className="form-control"
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
                        className="form-control"
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
                        className="form-control"
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
                        className="form-control"
                        placeholder="Phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Button
                    className="btn btn-outline-light"
                    variant="secondary"
                    id="submit-btn"
                    data-replace=""
                    type="submit"
                >
                    Create Customer Profile
                </Button>
            </Form>
        </div>
    )
}
