import React, { createContext, useContext, useState, useEffect } from 'react'

// Create the context outside of the component
const UserContext = createContext()

// Define the provider component
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

// Define the hook to consume the context
export const useUser = () => useContext(UserContext)

// Export React for linting purposes
export default React
