import { useEffect, useState } from 'react'

function ShopDetails() {
    const [shop, setShop] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/shops/${shop_id}/`
            )

            if (response.ok) {
                const data = await response.json()
                setShop(data)
            } else {
                throw new Error(
                    'Failed to fetch data. Status: ${response.status}'
                )
            }
        } catch (error) {
            console.error('Error fetching shop data', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [shopId])
    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    if (!shop) {
        return <p>No shop data available.</p>
    }
    return (
        <div>
            <h1>{shop.shop_name}</h1>
            {/* Add other details you want to display */}
        </div>
    )
}

export default ShopDetails
