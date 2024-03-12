import { useState, useEffect } from 'react'

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
    const [addSuccess, setAddSuccess] = useState(false)

    useEffect(() => {
        // Fetch suppliers when component mounts
        fetchSuppliers()
    }, [])

    const fetchSuppliers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/profile')
            if (response.ok) {
                const suppliersData = await response.json()
                console.log(suppliersData)
                setSuppliers(suppliersData)
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
            setFormData({
                name: '',
                description: '',
                price: 0,
                quantity_in_stock: 0,
                category: '',
                supplier_id: 0,
                alert_threshold: 0,
            })
            addSuccess(true)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    console.log(formData)

    return (
        <div>
            <div className="container-fluid my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                {addSuccess && (
                                    <div
                                        className="alert alert-success alert-dismissible fade show"
                                        role="alert"
                                    >
                                        Product successfully added!
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setAddSuccess(false)}
                                        ></button>
                                    </div>
                                )}
                                <h1 className="card-title text-center mb-4">
                                    Add Product
                                </h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="productName"
                                            className="form-label"
                                        >
                                            Product Name
                                        </label>
                                        <input
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            name="name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="description"
                                            className="form-label"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="form-control"
                                            name="description"
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="price"
                                            className="form-label"
                                        >
                                            Price
                                        </label>
                                        <input
                                            value={formData.price}
                                            onChange={handleChange}
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="quantity_in_stock"
                                            className="form-label"
                                        >
                                            Quantity in Stock:
                                        </label>
                                        <input
                                            value={formData.quantity_in_stock}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            name="quantity_in_stock"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="category"
                                            className="form-label"
                                        >
                                            Category:
                                        </label>
                                        <input
                                            value={formData.category}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            name="category"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="supplier_id"
                                            className="form-label"
                                        >
                                            Supplier
                                        </label>
                                        <select
                                            value={formData.supplier_id}
                                            onChange={handleChange}
                                            className="form-control"
                                            name="supplier_id"
                                        >
                                            <option value="">
                                                Select a Supplier
                                            </option>
                                            {suppliers.map((supplier) => (
                                                <option
                                                    key={supplier.id}
                                                    value={supplier.id}
                                                >
                                                    {supplier.first_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="alert_threshold"
                                            className="form-label"
                                        >
                                            Alert Threshold:
                                        </label>
                                        <input
                                            value={formData.alert_threshold}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            name="alert_threshold"
                                        />
                                    </div>

                                    <button
                                        className="btn btn-lg btn-primary"
                                        type="submit"
                                    >
                                        Add Product
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                    body {
                        background-color: #404821; /* Olive green */
                    }
                `}
            </style>
        </div>
    )
}

export default CreateProduct
