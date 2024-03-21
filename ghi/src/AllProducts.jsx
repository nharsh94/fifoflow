import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Sort from './Sort'
import Pagination from './PaginationComponent'
import Search from './Search'

function AllProducts() {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    })
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(5)

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
                checkAlertThreshold(data)
            } else {
                throw new Error(
                    `Failed to fetch product details. Status: ${response.status}`
                )
            }
        } catch (error) {
            console.error('Error fetching product details', error)
        }
    }

    const checkAlertThreshold = (product) => {
        const { alert_threshold, quantity_in_stock, name, product_id } = product
        if (parseInt(alert_threshold) === quantity_in_stock) {
            toast.warn(
                `Product "${name}" (ID: ${product_id}) has reached alert threshold.`,
                {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        } else if (parseInt(alert_threshold) > quantity_in_stock) {
            toast.error(
                `Product "${name}" (ID: ${product_id}) quantity in stock is low.`,
                {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
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

    const requestSort = (key) => {
        let direction = 'asc'
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'asc'
        ) {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }
    const handleResetSort = () => {
        setSortConfig({
            key: null,
            direction: 'asc',
        })
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortConfig && sortConfig.key) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }
        }
        return 0
    })

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = sortedProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    )

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const handlePaginationClick = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <>
            <div className="container-list">
                <div className="order-history-wrapper custom-shadow1">
                <h1>All Products</h1>
                <Search value={searchQuery} onChange={handleSearch} placeholder="Search by product name.." />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginBottom: '10px',
                        paddingRight: '10px',
                    }}
                >
                    <span
                        style={{ marginRight: '5px', cursor: 'pointer' }}
                        onClick={handleResetSort}
                    >
                        Reset
                    </span>
                    <i
                        className="bi bi-funnel-fill"
                        onClick={handleResetSort}
                        style={{ cursor: 'pointer' }}
                    ></i>
                </div>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <Sort
                                label="Product ID"
                                onClick={() => requestSort('product_id')}
                                sortConfig={sortConfig}
                                field="product_id"
                            />
                            <Sort
                                label="Name"
                                onClick={() => requestSort('name')}
                                sortConfig={sortConfig}
                                field="name"
                            />
                            <Sort
                                label="Price"
                                onClick={() => requestSort('price')}
                                sortConfig={sortConfig}
                                field="price"
                            />
                            <Sort
                                label="Description"
                                onClick={() => requestSort('description')}
                                sortConfig={sortConfig}
                                field="description"
                            />
                            <Sort
                                label="Deleted"
                                onClick={() => requestSort('deleted_flag')}
                                sortConfig={sortConfig}
                                field="deleted_flag"
                            />
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.product_id}>
                                <td>{product.product_id}</td>
                                <td>{product.name}</td>
                                <td>{`$${product.price}`}</td>
                                <td>{product.description}</td>
                                <td>{product.deleted_flag ? 'Yes' : 'No'}</td>
                                <td>
                                    {product.description &&
                                    product.category &&
                                    product.alert_threshold &&
                                    (product.quantity_in_stock > 1 ||
                                        product.quantity_in_stock === '') ? (
                                        <Button
                                            variant={
                                                product.deleted_flag
                                                    ? 'secondary'
                                                    : 'success'
                                            }
                                            onClick={() =>
                                                handleShowModal(product)
                                            }
                                        >
                                            {product.deleted_flag
                                                ? 'View'
                                                : 'Details'}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant={
                                                product.deleted_flag
                                                    ? 'secondary'
                                                    : 'primary'
                                            }
                                            onClick={() =>
                                                handleShowModal(product)
                                            }
                                        >
                                            {product.deleted_flag
                                                ? 'View'
                                                : 'Edit'}
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePaginationClick}
                />
            </div>
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
