import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './SignUp.css'

export default function AssignRole() {
    const [roles] = useState([
        { role_id: 1, role_name: 'Admin' },
        { role_id: 2, role_name: 'Manager' },
        { role_id: 3, role_name: 'Employee' },
    ])
    const [selectedRoleId, setSelectedRoleId] = useState('')
    const [error] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const { user_id } = location.state || {}

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const selectedRole = roles.find(
            (role) => role.role_id.toString() === selectedRoleId
        )
        if (!selectedRole) throw new Error('Invalid role selected')

        navigate('/profile', {
            state: {
                user_id,
                role_id: selectedRoleId.role_id,
                role_name: selectedRole.role_name,
            },
        })
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
                <button
                    type="submit"
                    className="btn btn-primary btn-assign-role"
                >
                    Assign Role
                </button>
            </form>
        </div>
    )
}
