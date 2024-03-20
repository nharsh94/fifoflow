import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'

function UsersList() {
    const [users, setUsers] = useState([])

    const getUserData = async () => {
        const response = await fetch('http://localhost:8000/api/user/list')

        if (response.ok) {
            const data = await response.json()
            setUsers(data)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            <h1>Users</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
export default UsersList
