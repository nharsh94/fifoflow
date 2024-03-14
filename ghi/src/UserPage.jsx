import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'


function UserPage({ isLoggedIn }) {
    const [users, setUsers] = useState([])
    const [loggedInUsername, setLoggedInUsername] = useState('');
    const [currentUser, setCurrentUser] = useState(null)


    // If the user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/" replace />
    }

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/user/list')
            if (response.ok) {
                const data = await response.json()
                setUsers(data)
            } else {
                throw new Error(
                    'Failed to fetch data. Status: ${response.status}'
                )
            }
        } catch (error) {
            console.error('Error fetching user data', error)
        }
    }

    useEffect(() => {
        getData()
        const username = localStorage.getItem('username')
        setLoggedInUsername(username)
    }, [])

    // useEffect to calculate currentUser when users state changes
    useEffect(() => {
        const foundUser = users.find(
            (user) => user.username === loggedInUsername
        )
        setCurrentUser(foundUser)
    }, [users, loggedInUsername])


    // const currentUser = users.find(user => user.username === loggedInUsername)
    // console.log(currentUser)

    return (
        <>
            {isLoggedIn && (
                <div className="user-page">
                    {currentUser && (
                        <h1 key={currentUser.id}>
                            Welcome, {currentUser.username}!
                        </h1>
                    )}
                    <p>
                        This area provides user-specific information and
                        functionality.
                    </p>
                    {/* Add user-specific content, links, or functionality here as needed */}
                </div>
            )}
        </>
    )
}

export default UserPage
