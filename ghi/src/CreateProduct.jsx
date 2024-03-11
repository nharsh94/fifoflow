import React, { useState } from 'react'

function CreateProduct() {
    //     const [formData, setFormData] = useState({
    //         productName: '',
    //         description: '',
    //         price: 0,
    //         quantity_in_stock: 0,
    //         category: '',
    //         supplier_id: 0,
    //         alert_threshold: 0,
    //     })

    //     const handleFormChange = (e) => {
    //         const { name, value } = e.target
    //         setFormData({ ...formData, [name]: value })
    //     }

    //     const handleSubmit = (e) => {
    //         e.preventDefault()
    //         // Handle form submission logic here
    //         console.log('Form submitted with data:', formData)
    //     }

    //     return (
    //         <div className="App-header">
    //             <h1>Add Products</h1>
    //             <form onSubmit={handleSubmit}>
    //                 <div className="mb-3">
    //                     <label htmlFor="product_name" className="form-label">
    //                         Product Name:
    //                     </label>
    //                     <input
    //                         value={formData.productName}
    //                         onChange={handleFormChange}
    //                         type="text"
    //                         className="form-control"
    //                         name="productName"
    //                     />
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="description" className="form-label">
    //                         Description:
    //                     </label>
    //                     <input
    //                         value={formData.description}
    //                         onChange={handleFormChange}
    //                         type="text"
    //                         className="form-control"
    //                         name="description"
    //                     />
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="price" className="form-label">
    //                         Price:
    //                     </label>
    //                     <input
    //                         value={formData.price}
    //                         onChange={handleFormChange}
    //                         type="text"
    //                         className="form-control"
    //                         name="price"
    //                     />
    //                 </div>
    // <div className="mb-3">
    //     <label htmlFor="quantity_in_stock" className="form-label">
    //         Quantity in Stock:
    //     </label>
    //     <input
    //         value={formData.quantity_in_stock}
    //         onChange={handleFormChange}
    //         type="text"
    //         className="form-control"
    //         name="quantity_in_stock"
    //     />
    // </div>
    // <div className="mb-3">
    //     <label htmlFor="supplier_id" className="form-label">
    //         Supplier
    //     </label>
    //     <select
    //         value={formData.supplier_id}
    //         onChange={handleFormChange}
    //         className="form-control"
    //         name="supplier_id"
    //     >
    //         <option value="">Select a Supplier</option>
    //         {/* map over bins array and generate options */}
    //     </select>
    // </div>
    // <div className="mb-3">
    //     <label htmlFor="alert_threshold" className="form-label">
    //         Alert Threshold:
    //     </label>
    //     <input
    //         value={formData.alert_threshold}
    //         onChange={handleFormChange}
    //         type="text"
    //         className="form-control"
    //         name="alert_threshold"
    //     />
    // </div>
    //                 <button className="btn btn-lg btn-primary w-100" type="submit">
    //                     Create Product
    //                 </button>
    //             </form>
    //         </div>
    //     )
    // }

    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        price: 0,
        quantity_in_stock: 0,
        category: '',
        supplier_id: 0,
        alert_threshold: 0,
    })

    const [addSuccess, setAddSuccess] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        // Your form submission logic goes here
        // Example: Call an API to add the product
        // If successful, setAddSuccess(true);
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
                                            value={formData.productName}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            name="productName"
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
                                            {/* map over bins array and generate options */}
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
