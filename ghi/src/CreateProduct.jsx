import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    const fetchSuppliers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/profile')
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
        const url = 'http://localhost:8000/api/products'
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
            <ToastContainer />
            <div className="container">
                <div className="signup-form-wrapper custom-shadow1">
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
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="FloatingDescription"
                            label="Description"
                            className="mb-1 custom-shadow"
                        >
                            <Form.Control
                                placeholder="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="FloatingSupplier"
                            label="Supplier"
                            className="mb-1 custom-shadow"
                        >
                            <Form.Select
                                value={formData.supplier_id}
                                onChange={handleChange}
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
