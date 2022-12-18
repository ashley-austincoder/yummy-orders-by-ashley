import { url } from "inspector";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { YumiOrder } from "../types";
import Meal from "./Meal";
import { OrdersPagination } from "./OrdersPagination";

interface OrdersProps {
    username: string;
    userId: number;
    setErrorMessage: (message: string | null) => void;
}

const Orders = (props: OrdersProps): JSX.Element | null => {
    const { username, userId, setErrorMessage } = props;
    const ordersApiUrl = `api/v1/orders?user_id=${userId}`;
    const { error, data: orders } = useFetch<YumiOrder[]>(ordersApiUrl);

    const [ordersPerPage, setOrdersPerPage] = useState<number>(4);
    const [page, setPage] = useState<number>(1);
    useEffect(() => {
        setErrorMessage(error ? `We could not retrieve the Orders for ${username}` : null);
    }, [error])
    
    return (
        <div className="container">
            <h2>{username}'s Orders:</h2>
            <div className="orders-container">
                {(orders || []).map(order => {
                    const { id, delivery_date, meal_count, meals } = order;
                    return (
                        <div className="order" key={id}>
                            <p>Delivery Date: {new Date(delivery_date).toLocaleDateString()}</p>
                            <p>Meal Count: {meal_count}</p>
                            {meals.map(meal => (
                                <div key={meal.id}>
                                    <Meal 
                                        quantity={meal.quantity}
                                        name={meal.name}
                                        description={meal.description}
                                        imageUrl={meal.imageUrl}
                                    />
                                </div>))}
                        </div>
                    )
                })}
                {orders && orders.length > ordersPerPage && <OrdersPagination setOrdersPerPage={setOrdersPerPage} />}
            </div>
        </div>
        
    )
}

export default Orders;