import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

function ProductsList() {
    const [products, setProducts] = useState([])
    const [selectedProdcut, setSelectedProduct] = useState(null)
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
                `http://localhost:8000/api/products/${selectedProdcut.product_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedProdcut),
                }
            )

            if (response.ok) {
                console.log('Product updated successfully:', selectedProdcut)
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

    const handleDeleteProduct = async () => {
        // Display a toast notification with custom buttons
        toast.warn(<Msg />, {
            position: toast.POSITION.TOP_CENTER,
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

    const handleDeleteConfirmation = async () => {
        // Proceed with delete action
        try {
            const response = await fetch(
                `http://localhost:8000/api/products/${selectedProdcut.product_id}`,
                {
                    method: 'DELETE',
                }
            )

            if (response.ok) {
                console.log('Product deleted successfully', selectedProdcut)
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
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity in Stock</th>
                            <th>Category</th>
                            <th>Supplier</th>
                            <th>alert_threshold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product.product_id}>
                                    <td>{product.product_id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{`$${product.price}`}</td>
                                    <td>{product.quantity_in_stock}</td>
                                    <td>{product.category}</td>
                                    <td>{product.supplier_id}</td>
                                    <td>{product.alert_threshold}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                handleShowModal(product)
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formProductName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                name="name"
                                value={selectedProdcut?.name || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                name="description"
                                value={selectedProdcut?.description || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter price"
                                name="price"
                                value={selectedProdcut?.price || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantiy In Stock</Form.Label>
                            <Form.Control
                                type="int"
                                placeholder="Enter quantity"
                                name="quantity_in_stock"
                                value={selectedProdcut?.quantity_in_stock || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Category"
                                name="category"
                                value={selectedProdcut?.category || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSupplier">
                            <Form.Label>Supplier</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Supplier"
                                name="supplier_id"
                                value={selectedProdcut?.supplier_id || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAlert">
                            <Form.Label>Alert Threshold</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter alert threshold"
                                name="alert_threshold"
                                value={selectedProdcut?.alert_threshold || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateProduct}>
                        Save Changes
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProduct}>
                        Delete Product
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer /> {/* Render the ToastContainer component */}
        </>
    )
}

export default ProductsList
