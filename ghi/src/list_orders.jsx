import React, {useState, useEffect} from "react";

function OrderList() {
    const [orders, setOrders] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8000/api/orders');

        if (response.ok) {
            const data = await response.json();
            setOrders(data.orders)
        }
    }
    useEffect(()=> {
        getData();
    }, [])


    return (
        <table>
            <thead>
                <tr>
                    <th>Item(s)</th>
                    <th>Quantity</th>
                    <th>Shop</th>
                    <th>Total Price</th>
                </tr>
            </thead>
                <tbody>
                    {orders.map(order => {
                        return (
                            <tr key={ order.order_id }>
                                <td>{ order.product_id }</td>
                                <td>{ order.quantity }</td>
                                <td>{ order.shop_id }</td>
                                <td>{ order.total_price }</td>
                            </tr>
                            );
                        })}
                </tbody>
             </table>
    );

}

export default OrderList
