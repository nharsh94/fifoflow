import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

function AllProducts() {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/products')

            if (response.ok) {
                const data = await response.json()
                setProducts(data)
            } else {
                throw new Error(
                    'Failed to fetch data. Status: ${response.status}'
                )
            }
        } catch (error) {
            console.error('Error fetching products data', error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleShowModal = async (product) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/products/${product.product_id}/`
            )
            if (response.ok) {
                const data = await response.json()
                setSelectedProduct(data)
                setShowModal(true)
            } else {
                throw new Error(
                    `Failed to fetch product details. Status: ${response.status}`
                )
            }
        } catch (error) {
            console.error('Error fetching product details', error)
        }
    }

    const handleUpdateProduct = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/products/${selectedProduct.product_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedProduct),
                }
            )

            if (response.ok) {
                console.log('Product updated successfully:', selectedProduct)
                handleCloseModal()
                getData()
            } else {
                throw new Error(
                    `Failed to update product. Status: ${response.status}`
                )
            }
        } catch (error) {
            console.error('Error updating product', error)
        }
    }
    const handleDeleteConfirmation = async () => {
        try {
            const updatedProduct = { ...selectedProduct, deleted_flag: true }
            const response = await fetch(
                `http://localhost:8000/api/products/${selectedProduct.product_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProduct),
                }
            )

            if (response.ok) {
                console.log('Product deleted successfully', selectedProduct)
                getData()
                handleCloseModal()
                toast.dismiss()
            } else {
                throw new Error(
                    `Failed to delete product. Status: ${response.status}`
                )
            }
        } catch (error) {
            console.error('Error deleting product', error)
        }
    }

    const handleDeleteProduct = async () => {
        toast.warn(<Msg />, {
            position: 'top-center',
            autoClose: false,
            closeButton: false,
            draggable: false,
            closeOnClick: false,
        })
    }

    const Msg = ({ closeToast }) => (
        <div>
            Are you sure you want to delete this product?
            <br></br>
            <button
                className={'btn btn-primary'}
                onClick={handleDeleteConfirmation}
            >
                Yes
            </button>
            <button className={'btn btn-danger'} onClick={closeToast}>
                No
            </button>
        </div>
    )

    const handleAddConfirmation = async () => {
        try {
            const updatedProduct = { ...selectedProduct, deleted_flag: false }
            const response = await fetch(
                `http://localhost:8000/api/products/${selectedProduct.product_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProduct),
                }
            )

            if (response.ok) {
                console.log('Product added successfully', selectedProduct)
                getData()
                handleCloseModal()
                toast.dismiss()
            } else {
                throw new Error(
                    `Failed to add product. Status: ${response.status}`
                )
            }
        } catch (error) {
            console.error('Error adding product', error)
        }
    }

    const handleAddProduct = async () => {
        toast.warn(<MsgtoAdd />, {
            position: 'top-center',
            autoClose: false,
            closeButton: false,
            draggable: false,
            closeOnClick: false,
        })
    }

    const MsgtoAdd = ({ closeToast }) => (
        <div>
            Are you sure you want to Add this product?
            <br></br>
            <button
                className={'btn btn-primary'}
                onClick={handleAddConfirmation}
            >
                Yes
            </button>
            <button className={'btn btn-danger'} onClick={closeToast}>
                No
            </button>
        </div>
    )

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSelectedProduct((prevProduct) => ({ ...prevProduct, [name]: value }))
    }

    return (
        <>
            <div>
                <h1>Products</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Deleted</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.product_id}>
                                <td>{product.product_id}</td>
                                <td>{product.name}</td>
                                <td>{`$${product.price}`}</td>
                                <td>{product.description}</td>
                                <td>{product.deleted_flag ? 'Yes' : 'No'}</td>
                                <td>
                                    {product.deleted_flag ? (
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                handleShowModal(product)
                                            }
                                        >
                                            View
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                handleShowModal(product)
                                            }
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedProduct &&
                        selectedProduct.description &&
                        selectedProduct.quantity_in_stock &&
                        selectedProduct.category &&
                        selectedProduct.alert_threshold
                            ? 'Product Details'
                            : 'Edit Product'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formProductName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                name="name"
                                value={selectedProduct?.name || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                name="description"
                                value={selectedProduct?.description || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter price"
                                name="price"
                                value={selectedProduct?.price || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantity In Stock</Form.Label>
                            <Form.Control
                                type="int"
                                placeholder="Enter quantity"
                                name="quantity_in_stock"
                                value={selectedProduct?.quantity_in_stock || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Category"
                                name="category"
                                value={selectedProduct?.category || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSupplier">
                            <Form.Label>Supplier</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Supplier"
                                name="supplier_id"
                                value={selectedProduct?.supplier_id || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAlert">
                            <Form.Label>Alert Threshold</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter alert threshold"
                                name="alert_threshold"
                                value={selectedProduct?.alert_threshold || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    {selectedProduct && selectedProduct.deleted_flag ? (
                        <Button variant="success" onClick={handleAddProduct}>
                            Add Product
                        </Button>
                    ) : (
                        <Button variant="danger" onClick={handleDeleteProduct}>
                            Delete Product
                        </Button>
                    )}
                    <Button variant="primary" onClick={handleUpdateProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default AllProducts
