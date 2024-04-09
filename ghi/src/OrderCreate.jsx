<<<<<<< HEAD
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useUser } from './UserContext'

function OrderCreate() {
    const { userData } = useUser()
=======
import { useState, useEffect, useContext } from 'react'
import UserContext from './UserContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

console.table(import.meta.env)

const API_HOST = import.meta.env.VITE_API_HOST

function OrderCreate() {
    const { userData } = useContext(UserContext)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
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

<<<<<<< HEAD
    const getOrderData = async () => {
        const response = await fetch('http://localhost:8000/api/orders')
=======
    const noConsoleLog = -1

    if (noConsoleLog == 1) {
        console.log(orders, users)
    }

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
<<<<<<< HEAD
        const url = 'http://localhost:8000/api/orders/'
=======
        const url = `${API_HOST}orders`
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
        const product = products.find(
            (product) => product.product_id === formData.product_id
        )
        const total = formData.quantity * product.price
        formData.total_price = total

        formData.user_id = userData.user_id

        const newFormData = {
            ...formData,
            total_price: total,
        }

<<<<<<< HEAD
        const producturl = `http://localhost:8000/api/products/${product.product_id}`
=======
        const producturl = `${API_HOST}products/${product.product_id}`
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
        const productresponse = await fetch(producturl)
        if (productresponse.ok) {
            const productdata = await productresponse.json()
            productdata['quantity_in_stock'] =
                productdata['quantity_in_stock'] - newFormData.quantity
            if (productdata['quantity_in_stock'] < 0) {
<<<<<<< HEAD
                toast.error('Not enough quanity in stock')
=======
                toast.error('Not enough quantity in stock')
                return
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
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
                const updateConfig = {
                    method: 'PUT',
                    body: JSON.stringify(productdata),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                await fetch(producturl, updateConfig)

                toast.success('Order succesfully added!')

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
                        className="btn mt-2"
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
