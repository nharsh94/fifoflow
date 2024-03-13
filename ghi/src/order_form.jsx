import { useState } from 'react'

import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function OrderCreate() {
    const [orders, setOrders] = useState([])
    const [formData, setFormData] = useState({
        shop_ip: '',
        user_id: '',
        order_date: '',
        product_id: '',
        quantity: '',
        total_price: '',
        status: 'submitted'
    })

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const fullAddress = `${formData.street_address}, ${formData.city}, ${formData.selectedState}, ${formData.zip_code}`
        const url = 'http://localhost:8000/api/shops/'

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify({
                ...formData,
                address: fullAddress,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            setFormData({
                shop_name: '',
                street_address: '',
                city: '',
                selectedState: '',
                zip_code: '',
                phone: '',
            })
            setFormSuccess(true)
        }
    }

    const handleFormChange = (e, inputName) => {
        let value = e.target.value

        if (inputName === 'phone') {
            value = value.replace(/\D/g, '')

            if (value.length >= 3) {
                value = value.replace(/(\d{3})(?=\d)/, '$1-')
            }
            if (value.length >= 7) {
                value = value.replace(/(\d{3})-(\d{3})(?=\d)/, '$1-$2-')
            }

            value = value.slice(0, 12)
        }
        setFormData((prevState) => ({
            ...prevState,
            [inputName]: value,
        }))
    }
    let messageClasses = 'alert alert-success d-none mb-0'
    let formClasses = ''
    if (formSuccess) {
        messageClasses = 'alert alert-success mb-0'
        formClasses = 'd-none'
    }
    return (
        <>
            <div>
                <h1>Add Shop to Flow</h1>
                <Form
                    onSubmit={handleSubmit}
                    id="create-shop-form"
                    className="center-form"
                >
                    <div className="mb-3">
                        <FloatingLabel
                            controlId="FloatingInput"
                            label="Shop Name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="shop_name"
                                value={formData.shop_name}
                                onChange={(e) =>
                                    handleFormChange(e, 'shop_name')
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="FloatingStreetAddress"
                            label="Street Address"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="street_address"
                                value={formData.street_address}
                                onChange={(e) =>
                                    handleFormChange(e, 'street_address')
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="FloatingCity"
                            label="City"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="city"
                                value={formData.city}
                                onChange={(e) => handleFormChange(e, 'city')}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="FloatingState"
                            label="State"
                            className="mb-3"
                        >
                            <Form.Select
                                value={formData.selectedState}
                                onChange={(e) => handleStateChange(e)}
                            >
                                <option value="" disabled>
                                    Select a State
                                </option>
                                {stateOptions.map((state) => (
                                    <option
                                        key={state.value}
                                        value={state.value}
                                    >
                                        {state.value} - {state.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="FloatingZipCode"
                            label="Zip Code"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="zip_code"
                                value={formData.zip_code}
                                onChange={(e) =>
                                    handleFormChange(e, 'zip_code')
                                }
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="phone" label="Phone">
                            <Form.Control
                                type="tel"
                                placeholder="phone"
                                value={formData.phone}
                                onChange={(e) => handleFormChange(e, 'phone')}
                                pattern="\d{3}-\d{3}-\d{4}"
                                title="Enter a valid phone number (e.g., 123-456-7890)"
                            />
                        </FloatingLabel>
                    </div>
                    <Button
                        className="btn btn-outline-light"
                        variant="secondary"
                        id="submit-btn"
                        data-replace=""
                        type="submit"
                    >
                        Submit
                    </Button>{' '}
                </Form>
                <div className={messageClasses} id="success-message">
                    Shop added to Flow!
                </div>
            </div>
        </>
    )
}

export default ShopCreate
