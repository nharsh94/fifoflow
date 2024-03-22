import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from './UserContext'

const LogoutButton = () => {
    const { setUserData } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        setUserData({
            user_id: null,
            username: null,
            role: null,
            first_name: null,
            last_name: null,
            email: null,
            phone: null,
            access_token: null,
        })

        // localStorage.removeItem('userData')

        navigate('/')
    }

    return (
        <button className="btn btn-primary" onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutButton
