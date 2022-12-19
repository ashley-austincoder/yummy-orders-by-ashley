import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { getUserOrdersRoute } from '../../services/apiRoutes';
import { YumiOrder } from '../../types';
import Meal from '../Meal/Meal';
import { OrdersPagination } from './OrdersPagination';
import './orders.css';
import { ChangeSortDirection } from './ChangeSortDirection';
import useQueryParam from '../../hooks/useQueryParam';
import Order from './Order';

interface OrdersProps {
  userID: string;
  username?: string;
}

const Orders = (props: OrdersProps): JSX.Element | null => {
  const { userID, username } = props;
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
  const ordersShown = totalOrders ? Math.min(totalOrders, ordersPerPage) : null;
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
      {totalOrders && !deliveryDate && <p className='total-orders'>Showing {ordersShown} of {totalOrders} Orders</p>}
      <hr/>
      {username && <h2>{username}'s Orders</h2>}
      {orders &&
        orders.map((order) => {
          const { id, delivery_date, meal_count, meals } = order;
          return (
            <div key={id}>
              <Order
                id={id}
                deliveryDate={delivery_date}
                mealCount={meal_count}
                meals={meals}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Orders;
