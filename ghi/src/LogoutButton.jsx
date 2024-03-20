import { useUser } from './UserContext'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
    const { setUserData } = useUser()
    const navigate = useNavigate()

    const handleLogout = () => {
        setUserData({
            user_id: null,
            username: null,
            role: null,
            first_name: null,
            last_name: null,
        })

        localStorage.removeItem('userData')

        navigate('/')
    }

    return (
        <button className="btn btn-primary" onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutButton
