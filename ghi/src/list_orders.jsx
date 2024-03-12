import React, { useState, useEffect } from 'react'

function OrderList() {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [shops, setShops] = useState([])

    const getOrderData = async () => {
        const response = await fetch('http://localhost:8000/api/orders')

        if (response.ok) {
            const data = await response.json()
            setOrders(data)
        }
    }

    const getProductData = async () => {
        const response = await fetch('http://localhost:8000/api/products')

        if (response.ok) {
            const data = await response.json()
            setProducts(data)
        }
    }

    const getShopData = async () => {
        const response = await fetch('http://localhost:8000/api/shops')

        if (response.ok) {
            const data = await response.json()
            setShops(data)
        }
    }
    useEffect(() => {
        getOrderData(),
        getProductData(),
        getShopData()
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Shop</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => {
                    const product = products.find(product => product.product_id === order.product_id)
                    const shop = shops.find(shop => shop.shop_id === order.shop_id)
                    return (
                        <tr key={order.order_id}>
                            <td>{product ? product.name : "Product not found"}</td>
                            <td>{order.quantity}</td>
                            <td>{shop ? shop.shop_name : "Product not found"}</td>
                            <td>{order.total_price}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default OrderList
