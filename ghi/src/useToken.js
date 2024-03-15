import { useState } from 'react'

export default function useToken() {
    const getToken = () => {
        try {
            const tokenString = localStorage.getItem('token')
            if (!tokenString) return null // If token doesn't exist, return null
            // Check token length to avoid potential issues
            if (tokenString.length > 10000) {
                console.error('Token in localStorage is too long.')
                return null
            }
            const userToken = JSON.parse(tokenString)
            return userToken?.token
        } catch (error) {
            console.error('Error parsing token:', error.message)
            return null
        }
    }

    const [token, setToken] = useState(getToken())

    const saveToken = (userToken) => {
        try {
            localStorage.setItem('token', JSON.stringify(userToken))
            setToken(userToken.token)
        } catch (error) {
            console.error('Error saving token:', error.message)
        }
    }

    return {
        setToken: saveToken,
        token,
    }
}
