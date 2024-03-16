import { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Search from './Search'

function ShopsList() {
    const [shops, setShops] = useState([])
    const [selectedShop, setSelectedShop] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredShops, setFilteredShops] = useState([])

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/shops')

            if (response.ok) {
                const data = await response.json()
                setShops(data)
                setFilteredShops(data)
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
                console.log('Shop updated successfully:', selectedShop)
                handleCloseModal()
                getData()
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
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this shop?'
        )
        if (confirmDelete) {
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
                } else {
                    throw new Error(
                        `Failed to delete shop. Status: ${response.status}`
                    )
                }
            } catch (error) {
                console.error('Error deleting shop', error)
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSelectedShop((prevShop) => ({ ...prevShop, [name]: value }))
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase()
        setSearchQuery(query)

        const filteredShops = shops.filter((shop) =>
            shop.shop_name.toLowerCase().includes(query)
        )
        // Update state with filtered products
        setFilteredShops(filteredShops)
    }

    return (
        <>
            <div>
                <h1>Shops</h1>
                <Search value={searchQuery} onChange={handleSearch} />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Shop ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredShops.map((shop) => {
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
        </>
    )
}

export default ShopsList
