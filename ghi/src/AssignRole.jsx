import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './SignUp.css'

export default function AssignRole() {
    const [roles, setRoles] = useState([])
    const [selectedRoleId, setSelectedRoleId] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const { user_id } = location.state || {}

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/role')
                if (!response.ok) throw new Error('Failed to fetch roles')

                const rolesData = await response.json()
                setRoles(rolesData)
            } catch (error) {
                setError(
                    error.message || 'An error occurred while fetching roles'
                )
            }
        }

        fetchRoles()
    }, [])

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            const selectedRole = roles.find(
                (role) => role.role_id.toString() === selectedRoleId
            )
            if (!selectedRole) throw new Error('Invalid role selected')

            const response = await fetch('http://localhost:8000/api/role', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    role_id: selectedRole.role_id,
                    role_name: selectedRole.role_name,
                }),
            })
            console.log(response)

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to assign role')
            }

            navigate('/profile', {
                state: {
                    user_id,
                    role_id: selectedRole.role_id,
                    role_name: selectedRole.role_name,
                },
            })
        } catch (error) {
            setError(
                error.message ||
                    'An unknown error occurred while assigning role'
            )
        }
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleFormSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <select
                        value={selectedRoleId}
                        onChange={(event) =>
                            setSelectedRoleId(event.target.value)
                        }
                        className="form-select select-role"
                        required
                    >
                        <option value="">Select a role</option>
                        {roles.map((role) => (
                            <option
                                key={role.role_id}
                                value={role.role_id}
                                className="option-role"
                            >
                                {role.role_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn-assign-role">
                    Assign Role
                </button>
            </form>
        </div>
    )
}
