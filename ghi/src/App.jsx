import { useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    Navigate,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Nav from './Nav'
import ErrorNotification from './ErrorNotification'
import { UserProvider } from './UserContext'
{
    /* Authentication Routes */
}
import Construct from './Construct'
import SignUpUserForm from './SignUpUserForm'
import ForgotPassword from './ForgotPassword'
{
    /* User Routes */
}
import HomePage from './HomePage'
import UsersList from './UsersList'
import CreateSupplier from './CreateSupplier'
import AssignRole from './AssignRole.jsx'
import CreateProfile from './CreateProfile'
import ProfileDatabase from './ProfileDatabase'
import CreateCustomer from './CreateCustomer'
{
    /* Shop Routes */
}
import ShopCreate from './ShopCreate'
import ShopsList from './ShopsList'
{
    /* Product Routes */
}
import CreateProduct from './CreateProduct'
import ProductsList from './ProductsList'
import AllProducts from './AllProducts'
{
    /* Order Routes */
}
import OrderList from './OrderList'
import OrderCreate from './OrderCreate'
import OrderHistory from './OrdersHistory'


function Navigation() {
    const location = useLocation()
    return (
        location.pathname !== '/' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/role' &&
        location.pathname !== '/forgot-password' &&
        location.pathname !== '/profile' && <Nav />
    )
}


function App() {
    const [error] = useState(null)

    return (
            <UserProvider>
                <BrowserRouter>
                    <div className="App">
                        <Navigation />
                        <ErrorNotification error={error} />
                        <Routes>
                            <Route path="/" element={<Construct />} />
                            {/* Authentication Routes */}
                            <Route
                                path="/signup"
                                element={<SignUpUserForm />}
                            />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPassword />}
                            />
                            {/* User Routes */}
                            <Route
                                path="/home"
                                element={<HomePage />}
                            />
                            <Route path="/user" element={<UsersList />} />
                            <Route path="/role" element={<AssignRole />} />
                            <Route path="/user" element={<UsersList />} />
                            <Route path="profile">
                                <Route
                                    path="/profile"
                                    element={<CreateProfile />}
                                />
                                <Route
                                    path="/profile/list"
                                    element={<ProfileDatabase />}
                                />
                                <Route
                                    path="/profile/supplier"
                                    element={<CreateSupplier />}
                                />
                                <Route
                                    path="/profile/customer"
                                    element={<CreateCustomer />}
                                />
                            </Route>

                            {/* Shops Routes */}
                            <Route path="/shops">
                                <Route
                                    path="create"
                                    element={
                                        <ShopCreate />
                                    }
                                />
                                <Route
                                    path="list"
                                    element={
                                        <ShopsList />
                                    }
                                />
                            </Route>
                            {/* Products Routes */}
                            <Route path="/products">
                                <Route
                                    path="create"
                                    element={<CreateProduct />}
                                />
                                <Route path="list" element={<ProductsList />} />
                                <Route path="all" element={<AllProducts />} />
                            </Route>
                            {/* Orders Routes */}
                            <Route path="/orders">
                                <Route path="list" element={<OrderList />} />
                                <Route
                                    path="create"
                                    element={<OrderCreate />}
                                />
                                <Route
                                    path="history"
                                    element={<OrderHistory />}
                                />
                            </Route>
                            {/* Default Redirect */}
                            <Route
                                path="/"
                                element={<Navigate to="/construct" replace />}
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
            </UserProvider>
    )
}
export default App
