import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'

function ProductDetails () {
    const [showUsage, setShowUsage] = useState(false);

    const toggleStockAlert = async () => {
        try {
            const productId = `${product.id}`;
            const response = await fetch(`http://localhost:8000/api/products/${productId}/toggleStockAlert`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Stock alert toggled successfully');
            } else {
                console.error('Failed to toggle stock alert');
            }
        } catch (error) {
            console.error('An error occurred while toggling stock alert', error);
        }
    };

    const toggleUsage = async () => {
        try {
            const productId = `${product.id}`
            const response = await fetch (`http://localhost:8000/api/products/${productId}/toggleUsage`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const usageData = await response.json();
                console.log('Usage data:', usageData);
                setShowUsage(!showUsage);
            } else {
                console.error('Failed to fetch usage data');
            }
        } catch (error) {
            console.error('An error occurred while fetching usage data', error);
        }
    };

    return (
        <div>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Price: ${product.price.toString()}</p>
            <p>Quantity in Stock: {product.quantity_in_stock}</p>
            <Button variant="primary" onClick={toggleStockAlert}>
                {product.stock_alert
                    ? 'Disable Stock Alert'
                    : 'Enable Stock Alert'}
            </Button>
            <Button variant="info" onClick={toggleUsage}>
                {showUsage ? 'Hide Usage' : 'Show Usage'}
            </Button>
            {showUsage && (
                <div>
                    {/* Implement logic to display usage data */}
                    <p>Usage Data</p>
                </div>
            )}
            <hr />
        </div>
    );
};

export default ProductDetails
