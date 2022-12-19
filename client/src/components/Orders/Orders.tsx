import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { getUserOrdersRoute } from '../../services/apiRoutes';
import { YumiOrder } from '../../types';
import Meal from '../Meal/Meal';
import { OrdersPagination } from './OrdersPagination';
import './orders.css';
import { ChangeSortDirection } from './ChangeSortDirection';
import useQueryParam from '../../hooks/useQueryParam';

interface OrdersProps {
  userID: string;
}

const Orders = (props: OrdersProps): JSX.Element | null => {
  const { userID } = props;
  const [ordersPerPage, setOrdersPerPage] = useState<number>(4);
  const [page, setPage] = useState<number>(1);
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [totalOrders, setTotalOrders] = useState<number | null>(null);

  const [deliveryDate] = useQueryParam('delivery_date', '');
  const ordersApiUrl = getUserOrdersRoute(
    userID,
    ordersPerPage,
    page,
    direction,
    deliveryDate
  );
  const { data } = useFetch<{ orders: YumiOrder[] }>(ordersApiUrl);
  const orders = data && data.orders;

  return (
    <div className='container'>
      <OrdersPagination
        userID={userID}
        disabled={!!deliveryDate}
        page={page}
        ordersPerPage={ordersPerPage}
        setOrdersPerPage={setOrdersPerPage}
        setPage={setPage}
        setTotalOrders={setTotalOrders}
      />
      <ChangeSortDirection direction={direction} setDirection={setDirection} />
      <p className='total-orders'>{totalOrders} Total Orders</p>
      {orders &&
        orders.map((order) => {
          const { id, delivery_date, meal_count, meals } = order;
          return (
            <div className='order' key={id}>
              <div className='key-info'>
                <p>
                  <span className='highlight'>Delivery Date:</span>{' '}
                  {delivery_date}
                </p>
                <p>
                  <span className='highlight'>Meal Count:</span>
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
