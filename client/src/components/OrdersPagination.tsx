interface OrdersPaginationProps {
    setOrdersPerPage: (per: number) => void;
}

export const OrdersPagination = (props: OrdersPaginationProps): JSX.Element => {
    return (
        <div>I am an Order Pagination Component</div>
    )
}