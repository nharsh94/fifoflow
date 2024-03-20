import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'

function ProfileDatabase() {
    const [profiles, setProfiles] = useState([])

    const getUserData = async () => {
        const response = await fetch('http://localhost:8000/api/profile/')

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
        </>
    )
}
export default ProfileDatabase
