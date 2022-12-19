import useFetch from "../../hooks/useFetch";
import usePages from "../../hooks/usePageCount";
import { getOrderCountRoute } from "../../services/apiRoutes";

interface OrdersPaginationProps {
  userID: string;
  page: number;
  ordersPerPage: number;
  setOrdersPerPage: (per: number) => void;
  setPage: (page: number) => void;
}

export const OrdersPagination = (
  props: OrdersPaginationProps
): JSX.Element | null => {
  const {
    userID,
    page,
    ordersPerPage,
    setOrdersPerPage,
    setPage,
  } = props;

  const pages = usePages(userID, ordersPerPage);
  console.log("pages", pages);
  const handleOrdersPerPageChange = (e: any) => {
    setOrdersPerPage(Number(e.target.value));
  };

  const handlePageChange = (e: any) => {
    setPage(Number(e.target.value));
  };

  return (
    <div>
      <form>
        <label>
          Viewing
          <select value={ordersPerPage} onChange={handleOrdersPerPageChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
          </select>
          {`Order${ordersPerPage > 1 ? "s" : ""}`} per page
        </label>
        {pages.length > 1 && (
          <label className="page-select">
            Page
            <select value={page} onChange={handlePageChange}>
              {pages.map((pageNum) => {
                return (
                  <option value={pageNum.toString()}>
                    {pageNum.toString()}
                  </option>
                );
              })}
            </select>
          </label>
        )}
      </form>
    </div>
  );
};
