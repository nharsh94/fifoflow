import { useState, useEffect } from 'react'

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
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new order</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                        <div className="form-floating mb-3">
                            <select
                                onChange={handleFormChange}
                                value={formData.shop_id}
                                required
                                name="shop_id"
                                id="shop_id"
                                className="form-select"
                            >
                                <option value="">Choose an Shop</option>
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
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select
                                onChange={handleFormChange}
                                value={formData.user_id}
                                required
                                name="user_id"
                                id="user_id"
                                className="form-select"
                            >
                                <option value="">Select User</option>
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
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select
                                onChange={handleFormChange}
                                value={formData.product_id}
                                required
                                name="product_id"
                                id="product_id"
                                className="form-select"
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
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.quantity}
                                placeholder="Quantity"
                                required
                                type="number"
                                name="quantity"
                                id="quantity"
                                className="form-control"
                            />
                            <label htmlFor="starts">quantity</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OrderCreate
