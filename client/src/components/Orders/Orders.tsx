import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getUserOrdersRoute } from "../../services/apiRoutes";
import { YumiOrder } from "../../types";
import Meal from "../Meal/Meal";
import { OrdersPagination } from "./OrdersPagination";
import "./orders.css";

interface OrdersProps {
  userID: string;
}

const Orders = (props: OrdersProps): JSX.Element | null => {
  const { userID } = props;
  const [ordersPerPage, setOrdersPerPage] = useState<number>(4);
  const [page, setPage] = useState<number>(1);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  console.log('___ordersPerPage', ordersPerPage)


  const ordersApiUrl = getUserOrdersRoute(
    userID,
    ordersPerPage,
    page,
    direction
  );
  console.log('getUserOrdersRoute', ordersApiUrl)
  const { error, data: orders } = useFetch<YumiOrder[]>(ordersApiUrl);

  return (
    <div className="container">
      <OrdersPagination
        userID={userID}
        page={page}
        ordersPerPage={ordersPerPage}
        direction={direction}
        setOrdersPerPage={setOrdersPerPage}
        setDirection={setDirection}
        setPage={setPage}
      />
      {(orders || []).map((order) => {
        const { id, delivery_date, meal_count, meals } = order;
        return (
          <div className="order" key={id}>
            <div className="key-info">
              <p>
                <span className="highlight">Delivery Date:</span>{" "}
                {new Date(delivery_date).toLocaleDateString()}
              </p>
              <p>
                <span className="highlight">Meal Count:</span>
                {meal_count}
              </p>
            </div>
            <div>
              {meals.map((meal) => (
                <div key={meal.id}>
                  <Meal
                    quantity={meal.quantity}
                    name={meal.name}
                    description={meal.description}
                    imageUrl={meal.image_url}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
