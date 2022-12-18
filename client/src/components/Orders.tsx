import { url } from "inspector";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Order } from "../types";

interface OrdersProps {
    username: string;
    userId: number;
}

const Orders = (props: OrdersProps): JSX.Element | null => {
    const { username, userId } = props;
    const { error, data: orders } = useFetch<Order[]>(`api/v1/orders?user_id=${userId}`)
    console.log('___orders for ', username, orders);
    return (
        <div>
            <h2>{username}'s Orders:</h2>
            <code>{JSON.stringify(orders)}</code>
        </div>
        
    )
}

export default Orders;