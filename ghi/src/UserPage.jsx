import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'


function UserPage({ isLoggedIn }) {

    if (!isLoggedIn) {
        return <Navigate to="/" replace />
    }

    return (
        <>
                <div className="user-page">
                    <h1>Welcome!</h1>
                    <p>
                        This area provides user-specific information and
                        functionality.
                    </p>
                    {/* Add user-specific content, links, or functionality here as needed */}
                </div>
        </>
    )
}

export default UserPage
