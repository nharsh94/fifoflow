import React, { useState, useEffect } from 'react'

function OrderItems() {
    const [orderItems, setOrderItems] = useState([])
    const [FormData, setFormData] = useState({
        order_items: '',
    })

    const getData = async () => {
        const response = await fetch('http://localhost:8000/api/order-items')

        if (response.ok) {
            const data = await response.json()
            setOrderItems(data.order_items)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handleFormChange = (e) => {
        const value = e.target.value
        const inputName = e.target.name
        setFormData({
            ...FormData,
            [inputName]: value,
        })
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Shop</th>
                    <th>order</th>
                    <th>Item(s)</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {orderItems.map((order_item) => {
                    return (
                        <tr key={order_item.shop_id}>
                            <td>{order_item.order_id}</td>
                            <td>{order_item.product_id}</td>
                            <td>{order_item.quantity}</td>
                            <td>{order_item.unit_price}</td>
                            <td>{order.total_price}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default OrderItems
