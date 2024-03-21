import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function OrderCreate() {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [shops, setShops] = useState([])
    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({
        shop_id: '',
        user_id: '',
        product_id: '',
        quantity: '',
        total_price: '',
        status: 'submitted',
    })

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
    const handleFormChange = (e) => {
        const value = parseInt(e.target.value)
        const inputName = e.target.name
        setFormData({
            ...formData,
            [inputName]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = 'http://localhost:8000/api/orders/'
        const product = products.find(
            (product) => product.product_id === formData.product_id
        )
        const total = formData.quantity * product.price
        formData.total_price = total

        const newFormData = {
            ...formData,
            total_price: total,
        }

        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(newFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            toast.success('Order successfully added!')
            setFormData({
                shop_id: '',
                user_id: '',
                product_id: '',
                quantity: '',
                total_price: '',
                status: 'submitted',
            })
        }
    }

    useEffect(() => {
        getOrderData(), getProductData(), getShopData(), getUserData()
    }, [])

    return (
        <div className="container">
            <ToastContainer />
            <div className="order-create-wrapper custom-shadow1">
                <h1>Create a New Order</h1>
                <Form onSubmit={handleSubmit} className="center-form">
                    <FloatingLabel
                        controlId="FloatingShopId"
                        label="Shop"
                        className="mb-1 custom-shadow"
                    >
                        <Form.Select
                            value={formData.shop_id}
                            onChange={handleFormChange}
                            required
                            name="shop_id"
                        >
                            <option value="" disabled>
                                Choose a Shop
                            </option>
                            {shops.map((shop) => {
                                return (
                                    <option
                                        key={shop.shop_id}
                                        value={shop.shop_id}
                                    >
                                        {shop.shop_name}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="FloatingUser"
                        label="User"
                        className="mb-1 custom-shadow"
                    >
                        <Form.Select
                            onChange={handleFormChange}
                            value={formData.user_id}
                            required
                            name="user_id"
                        >
                            <option value="" disabled>
                                Select User
                            </option>
                            {users.map((user) => {
                                return (
                                    <option
                                        key={user.user_id}
                                        value={user.user_id}
                                    >
                                        {user.user_id}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="FloatingProduct"
                        label="Product"
                        className="mb-1 custom-shadow"
                    >
                        <Form.Select
                            value={formData.product_id}
                            onChange={handleFormChange}
                            required
                            name="product_id"
                        >
                            <option value="">Select Product</option>
                            {products.map((product) => {
                                return (
                                    <option
                                        key={product.product_id}
                                        value={product.product_id}
                                    >
                                        {product.name}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="FloatingQuantity"
                        label="Quantity"
                        className="mb-1 custom-shadow"
                    >
                        <Form.Control
                            type="number"
                            onChange={handleFormChange}
                            placeholder="Quantity"
                            value={formData.quantity}
                            required
                            name="quantity"
                        />
                    </FloatingLabel>
                    <Button
                        className="btn btn-outline-light mt-1"
                        variant="secondary"
                        id="submit-btn"
                        data-replace=""
                        type="submit"
                    >
                        Create
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default OrderCreate