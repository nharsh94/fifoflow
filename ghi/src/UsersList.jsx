import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'

<<<<<<< HEAD
=======
console.table(import.meta.env)

const API_HOST = import.meta.env.VITE_API_HOST

>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
function UsersList() {
    const [users, setUsers] = useState([])

    const getUserData = async () => {
<<<<<<< HEAD
        const response = await fetch('http://localhost:8000/api/user/list')
=======
        const response = await fetch(`${API_HOST}user/list`)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8

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
            <div className="container-list">
                <div className="signup-form-wrapper custom-shadow1">
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
                </div>
            </div>
        </>
    )
}
export default UsersList
