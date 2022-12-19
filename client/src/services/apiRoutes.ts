export const getUserInfoRoute = (userId: string): string  => `/api/v1/users?user_id=${userId}`;

export const getUserOrdersRoute = (
  userId: string,
  per: number,
  page: number,
  direction: 'asc' | 'desc'
): string => {
  return `/api/v1/orders?user_id=${userId}&per=${per}&page=${page}&direction=${direction}`;
};

export const getOrderCountRoute = (userId: string): string  => `/api/v1/orders/getTotalCount?user_id=${userId}`;

export const getFilterByDeliveryDateRoute = (userId: string, deliveryDate: Date): string  => `/api/v1/orders/getTotalCount?user_id=${userId}&delivery_date=${deliveryDate}`;