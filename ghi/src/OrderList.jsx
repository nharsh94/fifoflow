import { useState, useEffect } from 'react'
import SearchComponent from './Search'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

function OrderList() {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [shops, setShops] = useState([])
    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState([])

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

    const getUserData = async () => {
        const response = await fetch('http://localhost:8000/api/profile')

        if (response.ok) {
            const data = await response.json()
            setUsers(data)
        }
    }

    useEffect(() => {
        getOrderData(), getProductData(), getShopData(), getUserData()
    }, [])

    const handleCancel = async (order) => {
        const url = `http://localhost:8000/api/orders/${order.order_id}`
        const response = await fetch(url)
        const data = await response.json()
        data['status'] = 'cancelled'
        const cancelConfig = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        await fetch(url, cancelConfig)

        const producturl = `http://localhost:8000/api/products/${order.product_id}`
        const productresponse = await fetch(producturl)
        if (productresponse.ok) {
            const productdata = await productresponse.json()
            productdata['quantity_in_stock'] = productdata['quantity_in_stock'] + order.quantity
            const updateConfig = {
                method: 'PUT',
                body: JSON.stringify(productdata),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await fetch(producturl, updateConfig)

            setOrders((prevOrders) =>
            prevOrders.map((ordermap) => {
                if (ordermap.order_id === order.order_id) {
                    return { ...ordermap, status: 'cancelled' }
                }
                return ordermap
            })
            )
        }
    }

    const handleApprove = async (id) => {
        const url = `http://localhost:8000/api/orders/${id}`
        const response = await fetch(url)
        const data = await response.json()
        data['status'] = 'approved'
        const cancelConfig = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        await fetch(url, cancelConfig)

        setOrders((prevOrders) =>
            prevOrders.map((ordermap) => {
                if (ordermap.order_id === order.order_id) {
                    return { ...ordermap, status: 'approved' }
                }
                return order
            })
        )
    }

    const handleSearch = (e) => {
        const inputValue = e.target.value.toLowerCase()
        if (typeof inputValue === 'string') {
            setSearchQuery(inputValue)
        }
    }
    const filteredOrders = orders.filter((order) => {
        const product = products.find(
            (product) => product.product_id === order.product_id
        )

        if (
            product &&
            order.status !== 'cancelled' &&
            order.status !== 'approved'
        ) {
            return product.name.toLowerCase().includes(searchQuery)
        }

        return false
    })
    return (
        <>
            <div className="container-list">
                <div className="signup-form-wrapper custom-shadow1">
                    <h1>Orders</h1>
                        <SearchComponent
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search by product name.."
                        />
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Shop</th>
                                <th>Total Price</th>
                                <th>Orderer</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                const product = products.find(
                                    (product) =>
                                        product.product_id === order.product_id
                                )
                                const shop = shops.find(
                                    (shop) => shop.shop_id === order.shop_id
                                )
                                const user = users.find(
                                    (user) => user.user_id === order.user_id
                                )
                                const date = new Date(order.order_date)
                                const formattedDate = `${
                                    date.getMonth() + 1
                                }-${date.getDate()}-${date.getFullYear()}`
                                return (
                                    <tr key={order.order_id}>
                                        <td>
                                            {product
                                                ? product.name
                                                : 'Product not found'}
                                        </td>
                                        <td>{order.quantity}</td>
                                        <td>
                                            {shop
                                                ? shop.shop_name
                                                : 'Shop not found'}
                                        </td>
                                        <td>{order.total_price}</td>
                                        <td>
                                            {user
                                                ? user.first_name +
                                                  ' ' +
                                                  user.last_name
                                                : 'User not found'}
                                        </td>
                                        <td>{formattedDate}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <Button
                                                onClick={() =>
                                                    handleApprove(
                                                        order.order_id
                                                    )
                                                }
                                            >
                                                Approve
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    handleCancel(order)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default OrderList
