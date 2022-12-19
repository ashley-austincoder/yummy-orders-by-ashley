import useFetch from "../../hooks/useFetch";
import { getOrderCountRoute } from "../../services/apiRoutes";

interface OrdersPaginationProps {
  userID: string;
  page: number;
  ordersPerPage: number;
  direction: "asc" | "desc";
  setOrdersPerPage: (per: number) => void;
  setPage: (page: number) => void;
  setDirection: (direction: "asc" | "desc") => void;
}

export const OrdersPagination = (
  props: OrdersPaginationProps
): JSX.Element | null => {
  const {
    userID,
    page,
    ordersPerPage,
    direction,
    setOrdersPerPage,
    setPage,
    setDirection,
  } = props;
  // const getTotalOrdersUrl = getOrderCountRoute(userID)
  // const { error, data: totalOrders } = useFetch<string>(getTotalOrdersUrl);
  // console.log('Total orders in UI', totalOrders);
  // const pageCount = totalOrders ? Math.ceil(Number(totalOrders) / ordersPerPage) : 1;
  // const showPaginationSelect = true; //ordersPerPage < totalOrders;

  const handleOrdersPerPageChange = (e: any) => {
    setOrdersPerPage(Number(e.target.value));
  };
  // const handlePageChange = (e: any) => {
  //   setPage(Number(e.target.value));
  // }
  // console.log('totalOrders > ordersPerPage', totalOrders, ordersPerPage)
  return (
    <div>
      <form>
        <div>
        <label>
          Viewing
          <select value={ordersPerPage} onChange={handleOrdersPerPageChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
          </select>
          {`Order${ordersPerPage > 1 ? 's' : ''}`} per page
        </label>
        </div>
      </form>
    </div>
  );
};


/**
 * <div>
        {showPaginationSelect && <label>
          Page
          <select value={page} onChange={handlePageChange}>
            {new Array(pageCount).map((_, index) => {
              return <option value={`${index + 1}`}>{index + 1}</option>
            })}
            
            {/* <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option> 
            </select>
            </label>
          
          }
          </div>
 */