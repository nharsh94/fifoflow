import { useState, useEffect } from 'react'
import SearchComponent from './Search'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

<<<<<<< HEAD
=======
console.table(import.meta.env)

const API_HOST = import.meta.env.VITE_API_HOST

>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
function OrderList() {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [shops, setShops] = useState([])
    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
<<<<<<< HEAD
    const getOrderData = async () => {
        const response = await fetch('http://localhost:8000/api/orders')
=======

    const getOrderData = async () => {
        const response = await fetch(`${API_HOST}orders`)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
        if (response.ok) {
            const data = await response.json()
            setOrders(data)
        }
    }
    const getProductData = async () => {
<<<<<<< HEAD
        const response = await fetch('http://localhost:8000/api/products')
=======
        const response = await fetch(`${API_HOST}products`)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
        if (response.ok) {
            const data = await response.json()
            setProducts(data)
        }
    }
    const getShopData = async () => {
<<<<<<< HEAD
        const response = await fetch('http://localhost:8000/api/shops')
=======
        const response = await fetch(`${API_HOST}shops`)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
        if (response.ok) {
            const data = await response.json()
            setShops(data)
        }
    }
    const getUserData = async () => {
<<<<<<< HEAD
        const response = await fetch('http://localhost:8000/api/profile')
=======
        const response = await fetch(`${API_HOST}profile`)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
        if (response.ok) {
            const data = await response.json()
            setUsers(data)
        }
    }
    useEffect(() => {
        getOrderData(), getProductData(), getShopData(), getUserData()
    }, [])
    const handleCancel = async (order) => {
<<<<<<< HEAD
        const url = `http://localhost:8000/api/orders/${order.order_id}`
=======
        const url = `${API_HOST}orders/${order.order_id}`
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
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
        toast.success('Order cancelled successfully')
<<<<<<< HEAD
        const producturl = `http://localhost:8000/api/products/${order.product_id}`
=======
        const producturl = `${API_HOST}products/${order.product_id}`
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
        const productresponse = await fetch(producturl)
        if (productresponse.ok) {
            const productdata = await productresponse.json()
            productdata['quantity_in_stock'] =
                productdata['quantity_in_stock'] + order.quantity
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
    const handleApprove = async (order) => {
<<<<<<< HEAD
        const url = `http://localhost:8000/api/orders/${order.order_id}`
=======
        const url = `${API_HOST}orders/${order.order_id}`
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
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
        toast.success('Order approved successfully')
        setOrders((prevOrders) =>
            prevOrders.map((ordermap) => {
                if (ordermap.order_id === order.order_id) {
                    return { ...ordermap, status: 'approved' }
                }
                return ordermap
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
                <ToastContainer />
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
                                                    handleApprove(order)
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
