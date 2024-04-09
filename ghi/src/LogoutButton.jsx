<<<<<<< HEAD
import { useUser } from './UserContext'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
    const { setUserData } = useUser()
=======
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from './UserContext'

const LogoutButton = () => {
    const { setUserData } = useContext(UserContext)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
    const navigate = useNavigate()

    const handleLogout = () => {
        setUserData({
            user_id: null,
            username: null,
            role: null,
            first_name: null,
            last_name: null,
<<<<<<< HEAD
        })

        localStorage.removeItem('userData')
=======
            email: null,
            phone: null,
            access_token: null,
        })

        // localStorage.removeItem('userData')
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8

        navigate('/')
    }

    return (
        <button className="btn btn-primary" onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutButton
