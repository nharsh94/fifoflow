import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
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
        <>
            <ToastContainer />
            <div className="container">
                <div className="create-customer-wrapper custom-shadow1">
                    <h1>Create a Customer</h1>
                    <Form
                        id="create-customer-form"
                        className="center-form mb-1"
                        onSubmit={handleFormSubmit}
                    >
                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}
                        <FloatingLabel
                            controlId="formGroupUser"
                            label="User"
                            className="mb-1 custom-shadow"
                        >
                            <Form.Select
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
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="fromGroupFirstName"
                            className="mb-1 custom-shadow"
                            label="First Name"
                        >
                            <Form.Control
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={profileData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="fromGroupLastName"
                            className="mb-1 custom-shadow"
                            label="Last Name"
                        >
                            <Form.Control
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={profileData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="fromGroupEmail"
                            className="mb-1 custom-shadow"
                            label="Email"
                        >
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={profileData.email}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="fromGroupPhone"
                            className="mb-1 custom-shadow"
                            label="Phone"
                        >
                            <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={profileData.phone}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>

                        <Button
                            className="btn mt-2"
                            variant="secondary"
                            id="submit-btn"
                            data-replace=""
                            type="submit"
                        >
                            Create
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}
