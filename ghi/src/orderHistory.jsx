import { useState, useEffect } from 'react'
import SearchComponent from './Search'
import Table from 'react-bootstrap/Table'
import Sort from './Sort'
import Pagination from './PaginationComponent'

function OrderHistory() {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [shops, setShops] = useState([])
    const [users, setUsers] = useState([])
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc',
    })
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersPerPage] = useState(5)

    const getOrderData = async () => {
        const response = await fetch('http://localhost:8000/api/orders')

        if (response.ok) {
            const data = await response.json()
            setOrders(data)
        }
    }

    const getProductData = async () => {
        const response = await fetch('http://localhost:8000/api/products')

        if (response.ok) {
            const data = await response.json()
            setProducts(data)
        }
    }

    const getShopData = async () => {
        const response = await fetch('http://localhost:8000/api/shops')

        if (response.ok) {
            const data = await response.json()
            setShops(data)
        }
    }

    const getUserData = async () => {
        const response = await fetch('http://localhost:8000/api/profile')

        if (response.ok) {
            const data = await response.json()
            setUsers(data)
        }
    }

    useEffect(() => {
        getOrderData(), getProductData(), getShopData(), getUserData()
    }, [])

    const handleSearch = (e) => {
        const inputValue = e.target.value.toLowerCase()
        if (typeof inputValue === 'string') {
            setSearchQuery(inputValue)
        }
    }
    const filteredOrders = orders.filter((order) => {
        const product = products.find(
            (product) => product.product_id === order.product_id
        )

        if (
            product &&
            order.status === 'cancelled' &&
            order.status === 'approved'
        ) {
            return product.name.toLowerCase().includes(searchQuery)
        }
    })
    const sortedOrders = [...filteredOrders].sort((a, b) => {
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

    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = sortedOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    )
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

    const handlePaginationClick = (pageNumber) => setCurrentPage(pageNumber)

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

    return (
        <>
            <div className="container-list">
                <div className="order-history-wrapper custom-shadow1">
                    <h1>Orders History</h1>
                    <SearchComponent
                        value={searchQuery}
                        onChange={handleSearch}
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
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <Sort
                                    label="Product"
                                    onClick={() => requestSort('product_id')}
                                    sortConfig={sortConfig}
                                    field="product_id"
                                />
                                <Sort
                                    label="Quantity"
                                    onClick={() => requestSort('quantity')}
                                    sortConfig={sortConfig}
                                    field="quantity"
                                />
                                <Sort
                                    label="Shop"
                                    onClick={() => requestSort('shop_name')}
                                    sortConfig={sortConfig}
                                    field="shop_name"
                                />
                                <Sort
                                    label="Price"
                                    onClick={() => requestSort('total_price')}
                                    sortConfig={sortConfig}
                                    field="total_price"
                                />
                                <Sort
                                    label="Orderer"
                                    onClick={() => requestSort('orderer')}
                                    sortConfig={sortConfig}
                                    field="orderer"
                                />
                                <Sort
                                    label="Order Date"
                                    onClick={() => requestSort('order_date')}
                                    sortConfig={sortConfig}
                                    field="order_date"
                                />
                                <Sort
                                    label="Status"
                                    onClick={() => requestSort('status')}
                                    sortConfig={sortConfig}
                                    field="status"
                                />
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                const product = products.find(
                                    (product) =>
                                        product.product_id === order.product_id
                                )
                                const shop = shops.find(
                                    (shop) => shop.shop_id === order.shop_id
                                )
                                const user = users.find(
                                    (user) => user.user_id === order.user_id
                                )
                                const date = new Date(order.order_date)
                                const formattedDate = `${
                                    date.getMonth() + 1
                                }-${date.getDate()}-${date.getFullYear()}`
                                return (
                                    <tr key={order.order_id}>
                                        <td>
                                            {product
                                                ? product.name
                                                : 'Product not found'}
                                        </td>
                                        <td>{order.quantity}</td>
                                        <td>
                                            {shop
                                                ? shop.shop_name
                                                : 'Shop not found'}
                                        </td>
                                        <td>{order.total_price}</td>
                                        <td>
                                            {user
                                                ? user.first_name +
                                                  ' ' +
                                                  user.last_name
                                                : 'User not found'}
                                        </td>
                                        <td>{formattedDate}</td>
                                        <td>{order.status}</td>
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
        </>
    )
}

export default OrderHistory
