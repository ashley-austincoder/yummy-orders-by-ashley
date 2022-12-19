import { getOrderCountRoute } from '../services/apiRoutes';
import useFetch from './useFetch';

const useTotalAndPages = (userID: string, ordersPerPage: number): {pages: number[], totalOrders: number } => {
  const getTotalOrdersUrl = getOrderCountRoute(userID);
  const { data: countObject } = useFetch<any>(getTotalOrdersUrl);
  const orderCount =
    countObject && countObject.length ? countObject[0]['COUNT(ID)'] : undefined;
  const pageCount = orderCount
    ? Math.ceil(Number(orderCount) / ordersPerPage)
    : 1;
  const pagesArray: number[] = [];
  for (let i = 0; i < pageCount; i++) {
    pagesArray.push(i + 1);
  }
  return { pages: pagesArray, totalOrders: orderCount };
};

export default useTotalAndPages;
