import usePages from '../../hooks/usePageCount';

interface OrdersPaginationProps {
  userID: string;
  disabled: boolean;
  page: number;
  ordersPerPage: number;
  setOrdersPerPage: (per: number) => void;
  setPage: (page: number) => void;
}

export const OrdersPagination = (
  props: OrdersPaginationProps
): JSX.Element | null => {
  const { userID, disabled, page, ordersPerPage, setOrdersPerPage, setPage } =
    props;

  const pages = usePages(userID, ordersPerPage);

  const handleOrdersPerPageChange = (e: any) => {
    setOrdersPerPage(Number(e.target.value));
  };

  const handlePageChange = (e: any) => {
    setPage(Number(e.target.value));
  };

  return (
    <div className='pagination-container'>
      <form>
        <label>
          Viewing
          <select
            value={ordersPerPage}
            onChange={handleOrdersPerPageChange}
            disabled={disabled}
            title={
              disabled
                ? 'Disabled if filtering by date'
                : 'Select orders per page'
            }
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='4'>4</option>
            <option value='6'>6</option>
          </select>
          {`Order${ordersPerPage > 1 ? 's' : ''}`} per page
        </label>
        {pages.length > 1 && (
          <label className='page-select'>
            Page
            <select
              value={page}
              onChange={handlePageChange}
              disabled={disabled}
              title={disabled ? 'Disabled if filtering by date' : 'Select page'}
            >
              {pages.map((pageNum) => {
                return (
                  <option value={pageNum.toString()} key={pageNum}>
                    {pageNum.toString()}
                  </option>
                );
              })}
            </select>
          </label>
        )}
        <div>
          <small>
            Hint: Filter to a delivery date with query parameter, i.e.
            delivery_date=2018-06-01
          </small>
        </div>
      </form>
    </div>
  );
};
