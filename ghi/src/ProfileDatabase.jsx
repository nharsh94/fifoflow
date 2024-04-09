import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'

<<<<<<< HEAD
=======
console.table(import.meta.env)

const API_HOST = import.meta.env.VITE_API_HOST
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8

function ProfileDatabase() {
    const [profiles, setProfiles] = useState([])

    const getUserData = async () => {
<<<<<<< HEAD
        const response = await fetch('http://localhost:8000/api/profile/')
=======
        const response = await fetch(`${API_HOST}profile/`)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8

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
