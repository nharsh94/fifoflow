import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

<<<<<<< HEAD
=======
console.table(import.meta.env)

const API_HOST = import.meta.env.VITE_API_HOST

>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
function CreateProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        quantity_in_stock: 0,
        category: '',
        supplier_id: 0,
        alert_threshold: 0,
    })
    const [suppliers, setSuppliers] = useState([])
    useEffect(() => {
        fetchSuppliers()
    }, [])
<<<<<<< HEAD
    const fetchSuppliers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/profile')
=======

    const fetchSuppliers = async () => {
        try {
            const response = await fetch(`${API_HOST}profile`)
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
            if (response.ok) {
                const suppliersData = await response.json()
                const suppliersFiltered = suppliersData.filter(
                    (user) => user.role === 'Supplier'
                )
                setSuppliers(suppliersFiltered)
            } else {
                console.error('Failed to fetch suppliers')
            }
        } catch (error) {
            console.error('Error fetching suppliers:', error)
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
<<<<<<< HEAD
        const url = 'http://localhost:8000/api/products'
=======
        const url = `${API_HOST}products`
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify({
                ...formData,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            toast.success('Product successfully added!')
            setFormData({
                name: '',
                description: '',
                price: 0,
                quantity_in_stock: 0,
                category: '',
                supplier_id: 0,
                alert_threshold: 0,
            })
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    return (
        <>
            <div className="container">
                <ToastContainer />
                <div className="create-product-wrapper custom-shadow1">
                    <h1>Add Product</h1>
                    <Form
                        onSubmit={handleSubmit}
                        id="create-product-form"
                        className="center-form mb-1"
                    >
                        <FloatingLabel
                            controlId="FloatingProduct"
                            label="Product Name"
                            className="mb-1 custom-shadow"
                        >
                            <Form.Control
                                type="text"
                                placeholder="product_name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="FloatingDescription"
                            label="Description"
                            className="mb-1 custom-shadow"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="FloatingSupplier"
                            label="Supplier"
                            className="mb-1 custom-shadow"
                        >
                            <Form.Select
                                name="supplier_id"
                                value={formData.supplier_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a Supplier</option>
                                {suppliers.map((supplier) => (
                                    <option
                                        key={supplier.user_id}
                                        value={supplier.user_id}
                                    >
                                        {supplier.first_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <Button
                            className="btn mt-2"
                            variant="secondary"
                            id="submit-btn"
                            data-replace=""
                            type="submit"
                        >
                            Add Product
                        </Button>{' '}
                    </Form>
                </div>
            </div>
        </>
    )
}

export default CreateProduct
