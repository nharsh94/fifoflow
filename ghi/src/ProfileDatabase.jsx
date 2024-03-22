import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'

console.table(import.meta.env)

const API_HOST = import.meta.env.VITE_API_HOST

function ProfileDatabase() {
    const [profiles, setProfiles] = useState([])

    const getUserData = async () => {
        const response = await fetch(`${API_HOST}profile/`)

        if (response.ok) {
            const data = await response.json()
            setProfiles(data)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            <div className="container-list">
                <div className="signup-form-wrapper custom-shadow1">
                    <h1>Profiles</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role Assigned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.map((profile) => (
                                <tr key={profile.id}>
                                    <td>{profile.first_name}</td>
                                    <td>{profile.last_name}</td>
                                    <td>{profile.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}
export default ProfileDatabase
