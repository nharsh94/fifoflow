import { useUser } from './UserContext'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
    const { setUserData } = useUser()
    const navigate = useNavigate()

    const handleLogout = () => {
        // Clear user data by setting it to its initial value
        setUserData({
            user_id: null,
            username: null,
            role: null,
            first_name: null,
            last_name: null,
        })

        // Remove user data from local storage
        localStorage.removeItem('userData')

        // Navigate back to the home page or any other route
        navigate('/')

        // Additional logic for any other cleanup or actions after logout
    }

    return (
        <button className="btn btn-primary" onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutButton
