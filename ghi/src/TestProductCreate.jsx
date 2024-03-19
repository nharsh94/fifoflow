import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import styles from './Forms.module.css'


import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function TestProductCreate({isLoggedIn}) {
    const [formSuccess, setFormSuccess] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity_in_stock: '',
        category: '',
        supplier_id: 0,
        alert_threshold: 0,
    })
    const [shops, setShops] = useState([])

    if (!isLoggedIn) {
        return <Navigate to="/" replace />
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/shops')
                if (response.ok) {
                    const data = await response.json()
                    setShops(data)
                } else {
                    throw new Error('Failed to fetch shop data')
                }
            } catch (error) {
                console.error('Error fetching shop data', error)
            }
        }

        fetchData()
    }, [])

    const handleStateChange = (e) => {
        const selectedValue = e.target.value
        setFormData((prevState) => ({
            ...prevState,
            shop_name: selectedValue,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = 'http://localhost:8000/api/products/'

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, fetchConfig)

        if (response.ok) {
            setFormData({
                name: '',
                description: '',
                price: '',
                quantity_in_stock: '',
                category: '',
                alert_threshold: 0,
                stock_alert: false,
                shop_name: '',
            })
            setFormSuccess(true)
        }
    }

    const handleFormChange = (e, inputName) => {
        const value = e.target.value

        setFormData((prevState) => ({
            ...prevState,
            [inputName]:
                inputName === 'quantity_in_stock' || inputName === 'price'
                    ? parseFloat(value)
                    : value,
        }))
    }

    let messageClasses = 'alert alert-success d-none mb-0'
    let formClasses = ''
    if (formSuccess) {
        messageClasses = 'alert alert-success mb-0'
        formClasses = 'd-none'
    }

    return (
        <>
            <div className="container">
                <div className="signup-form-wrapper custom-shadow1">
                <h1>Add Product</h1>
                <Form onSubmit={handleSubmit} className="center-form">
                    <FloatingLabel
                        controlId="FloatingName"
                        label="Product Name"
                        className="mb-1 custom-shadow"
                    >
                        <Form.Control
                            type="text"
                            placeholder="product_name"
                            value={formData.name}
                            onChange={(e) => handleFormChange(e, 'name')}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="FloatingDescription"
                        label="Description"
                        className="mb-1 custom-shadow"
                    >
                        <Form.Control
                            type="text"
                            placeholder="description"
                            value={formData.description}
                            onChange={(e) => handleFormChange(e, 'description')}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="FloatingPrice"
                        label="Price"
                        className="mb-1 custom-shadow"
                    >
                        <Form.Control
                            type="number"
                            placeholder="price"
                            value={formData.price}
                            onChange={(e) => handleFormChange(e, 'price')}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="FloatingQIS"
                        label="Quantity in Stock"
                        className="mb-1 custom-shadow"
                    >
                        <Form.Control
                            type="number"
                            placeholder="quantity_in_stock"
                            value={formData.quantity_in_stock}
                            onChange={(e) =>
                                handleFormChange(e, 'quantity_in_stock')
                            }
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="FloatingCategory"
                        label="Category"
                        className="mb-1 custom-shadow"
                    >
                        <Form.Control
                            type="text"
                            placeholder="category"
                            value={formData.category}
                            onChange={(e) => handleFormChange(e, 'category')}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="FloatingShop"
                        label="Shop"
                        className="mb-1 custom-shadow"
                    >
                        <Form.Select
                            value={formData.shop_name}
                            onChange={(e) => handleStateChange(e, 'shop_name')}
                        >
                            <option value="" disabled>
                                Select a Shop
                            </option>
                            {shops.map((shop) => (
                                <option
                                    key={shop.shop_id}
                                    value={shop.shop_name}
                                >
                                    {shop.shop_name}
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                    <Button
                        className="btn btn-outline-light mt-1"
                        variant="secondary"
                        id="submit-btn"
                        data-replace=""
                        type="submit"
                    >
                        Submit
                    </Button>{' '}
                </Form>
                </div>
                <div className={messageClasses} id="success-message">
                    Product added successfully!
                </div>
            </div>
        </>
    )
}

export default TestProductCreate
