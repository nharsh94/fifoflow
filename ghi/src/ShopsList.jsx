import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Sort from './Sort'
import Pagination from './PaginationComponent'
import SearchComponent from './Search'

function ShopsList() {
    const [shops, setShops] = useState([])
    const [selectedShop, setSelectedShop] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    })
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [shopsPerPage] = useState(5)

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/shops')

            if (response.ok) {
                const data = await response.json()
                setShops(data)
            } else {
                throw new Error(
                    'Failed to fetch data. Status: ${response.status}'
                )
            }
        } catch (error) {
            console.error('Error fetching shop data', error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleShowModal = async (shop) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/shops/${shop.shop_id}`
            )
            if (response.ok) {
                const data = await response.json()
                setSelectedShop(data)
                setShowModal(true)
            } else {
                throw new Error(
                    `Failed to fetch shop details. Status: ${response.status}`
                )
            }
        } catch (error) {
            console.error('Error fetching shop details', error)
        }
    }

    const handleUpdateShop = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/shops/${selectedShop.shop_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedShop),
                }
            )

            if (response.ok) {
                getData()
                handleCloseModal()
                toast.dismiss()
                toast.success('Shop updated successfully')
            } else {
                throw new Error(
                    `Failed to update shop. Status: ${response.status}`
                )
            }
        } catch (error) {
            console.error('Error updating shop', error)
        }
    }

    const handleDeleteShop = async () => {
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
            Are you sure you want to delete this shop?
            <br />
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
        try {
            const response = await fetch(
                `http://localhost:8000/api/shops/${selectedShop.shop_id}`,
                {
                    method: 'DELETE',
                }
            )

            if (response.ok) {
                console.log('Shop deleted successfully', selectedShop)
                getData()
                handleCloseModal()
                toast.dismiss()
                toast.success('Shop deleted successfully')
            } else {
                throw new Error(
                    `Failed to delete shop. Status: ${response.status}`
                )
            }
        } catch (error) {
            console.error('Error deleting shop', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSelectedShop((prevShop) => ({
            ...prevShop,
            [name]: value,
        }))
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

    const filteredShops = shops.filter((shop) =>
        shop.shop_name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const sortedShops = [...filteredShops].sort((a, b) => {
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

    const indexOfLastShop = currentPage * shopsPerPage
    const indexOfFirstShop = indexOfLastShop - shopsPerPage
    const currentShops = sortedShops.slice(indexOfFirstShop, indexOfLastShop)

    const totalPages = Math.ceil(filteredShops.length / shopsPerPage)

    const handlePaginationClick = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <>
            <div className="container-list">
                <div className="signup-form-wrapper custom-shadow1">
                    <h1>Shops</h1>
                    <SearchComponent
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by shop name.."
                    />
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
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <Sort
                                    label="Shop ID"
                                    onClick={() => requestSort('shop_id')}
                                    sortConfig={sortConfig}
                                    field="shop_id"
                                />
                                <Sort
                                    label="Name"
                                    onClick={() => requestSort('shop_name')}
                                    sortConfig={sortConfig}
                                    field="shop_name"
                                />
                                <Sort
                                    label="Address"
                                    onClick={() => requestSort('address')}
                                    sortConfig={sortConfig}
                                    field="address"
                                />
                                <Sort
                                    label="Phone"
                                    onClick={() => requestSort('phone')}
                                    sortConfig={sortConfig}
                                    field="phone"
                                />
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentShops.map((shop) => {
                                return (
                                    <tr key={shop.shop_id}>
                                        <td>{shop.shop_id}</td>
                                        <td>{shop.shop_name}</td>
                                        <td>{shop.address}</td>
                                        <td>{shop.phone}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() =>
                                                    handleShowModal(shop)
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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePaginationClick}
                    />
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Shop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formShopName">
                            <Form.Label>Shop Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter shop name"
                                name="shop_name"
                                value={selectedShop?.shop_name || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                name="address"
                                value={selectedShop?.address || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone"
                                name="phone"
                                value={selectedShop?.phone || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateShop}>
                        Save Changes
                    </Button>
                    <Button variant="danger" onClick={handleDeleteShop}>
                        Delete Shop
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default ShopsList
