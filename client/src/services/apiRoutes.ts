export const getUserInfoRoute = (userId: string): string =>
  `/api/v1/users?user_id=${userId}`;

export const getUserOrdersRoute = (
  userID: string,
  per: number,
  page: number,
  direction: 'asc' | 'desc',
  deliveryDate: string | null
): string => {
  return `/api/v1/orders?user_id=${userID}&per=${per}&page=${page}&direction=${direction}&delivery_date=${deliveryDate}`;
};

export const getOrderCountRoute = (userID: string): string =>
  `/api/v1/orders/getTotalCount?user_id=${userID}`;

export const getAllDeliveryDatesRoute = (userID: string): string =>
  `/api/v1/orders/getAllDeliveryDates?user_id=${userID}`;
