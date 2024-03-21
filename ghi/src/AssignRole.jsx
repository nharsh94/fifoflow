import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import logo from './assets/FIFOFlow_transparent_x1.png'

export default function AssignRole() {
    const [roles] = useState([
        { role_id: 1, role_name: 'Admin' },
        { role_id: 2, role_name: 'Manager' },
        { role_id: 3, role_name: 'Employee' },
        { role_id: 4, role_name: 'Supplier' },
        { role_id: 5, role_name: 'Customer' },
    ])
    const [selectedRoleId, setSelectedRoleId] = useState('')
    const [error] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const { user_id, username } = location.state || {}

    console.log(username)

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const selectedRole = roles.find(
            (role) => role.role_id.toString() === selectedRoleId
        )
        if (!selectedRole) throw new Error('Invalid role selected')

        navigate('/profile', {
            state: {
                user_id,
                username,
                role_id: selectedRoleId.role_id,
                role_name: selectedRole.role_name,
            },
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <img className="logo" src={logo} alt="FIFOFlow Logo" />
                <h5 className="motto">
                    An open-source, automated system for managing your
                    logistical nightmares!
                </h5>
                <div className="signup-form-wrapper custom-shadow1">
                    <div>
                        <h2 className="role">Choose your Role</h2>
                        <Form onSubmit={handleFormSubmit}>
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}
                            <FloatingLabel
                                controlId="FloatingRole"
                                label="Role"
                                className="mb-1 custom-shadow"
                            >
                                <Form.Select
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
                                </Form.Select>
                            </FloatingLabel>
                            <Button
                                className="btn btn-outline-light mt-1"
                                variant="primary"
                                size="md"
                                id="account-btn"
                                data-replace=""
                                type="submit"
                            >
                                Assign Role
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
