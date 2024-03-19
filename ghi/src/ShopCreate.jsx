import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const stateOptions = [
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' },
    { label: 'District of Columbia', value: 'DC' },
    { label: 'American Samoa', value: 'AS' },
    { label: 'Guam', value: 'GU' },
    { label: 'Northern Mariana Islands', value: 'MP' },
    { label: 'Puerto Rico', value: 'PR' },
    { label: 'United States Minor Outlying Islands', value: 'UM' },
    { label: 'U.S. Virgin Islands', value: 'VI' },
]

function ShopCreate({ isLoggedIn }) {
    const [formSuccess, setFormSuccess] = useState(false)
    const [formData, setFormData] = useState({
        shop_name: '',
        street_address: '',
        city: '',
        selectedState: '',
        zip_code: '',
        phone: '',
    })

    if (!isLoggedIn) {
        return <Navigate to="/" replace />
    }

    const handleStateChange = (e) => {
        const selectedValue = e.target.value
        setFormData((prevState) => ({
            ...prevState,
            selectedState: selectedValue,
        }))
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
            <div className="container">
                <div className="signup-form-wrapper custom-shadow1">
                    <h1>Add Shop to Flow</h1>

                    <Form
                        onSubmit={handleSubmit}
                        id="create-shop-form"
                        className="center-form"
                    >
                        <div className="mb-1">
                            <FloatingLabel
                                controlId="FloatingInput"
                                label="Shop Name"
                                className="mb-1"
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
                                className="mb-1"
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
                                className="mb-1"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="city"
                                    value={formData.city}
                                    onChange={(e) =>
                                        handleFormChange(e, 'city')
                                    }
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="FloatingState"
                                label="State"
                                className="mb-1"
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
                                className="mb-1"
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
                                    onChange={(e) =>
                                        handleFormChange(e, 'phone')
                                    }
                                    pattern="\d{3}-\d{3}-\d{4}"
                                    title="Enter a valid phone number (e.g., 123-456-7890)"
                                />
                            </FloatingLabel>
                            <Button
                                className="btn btn-outline-light mt-1"
                                variant="secondary"
                                id="submit-btn"
                                data-replace=""
                                type="submit"
                            >
                                Submit
                            </Button>{' '}
                        </div>
                    </Form>
                </div>
                <div className={messageClasses} id="success-message">
                    Shop added to Flow!
                </div>
            </div>
        </>
    )
}

export default ShopCreate
