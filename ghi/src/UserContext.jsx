import { createContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    // Lazy initialization of userData from localStorage
    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData')
        return storedUserData
            ? JSON.parse(storedUserData)
            : {
                  user_id: null,
                  username: null,
                  role: null,
                  first_name: null,
                  last_name: null,
                  email: null,
                  phone: null,
                  access_token: null,
              }
    })

    // Update localStorage whenever userData changes
    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData))
    }, [userData])

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
