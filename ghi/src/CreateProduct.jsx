import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

    console.log('I am supplier', suppliers)

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
        <div>
            <ToastContainer />
            <div className="container-fluid my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
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
                                            placeholder="Name"
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
                                            placeholder="Description of item if any"
                                        ></textarea>
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
                                                    key={supplier.user_id}
                                                    value={supplier.user_id}
                                                >
                                                    {supplier.first_name}
                                                </option>
                                            ))}
                                        </select>
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
        </div>
    )
}

export default CreateProduct
