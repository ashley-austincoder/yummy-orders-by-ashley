import useFetch from "../../hooks/useFetch";
import { getFilterByDeliveryDateRoute } from "../../services/apiRoutes";

interface FilterByDeliveryDateProps {
  userID: string;
  deliveryDate: Date;
}

export const FilterByDeliveryDate = (
  props: FilterByDeliveryDateProps
): JSX.Element | null => {
  const {
    userID,
    deliveryDate
  } = props;
  const filterByDeliveryUrl = getFilterByDeliveryDateRoute(userID, deliveryDate);
  const { data: countObject } = useFetch<any>(filterByDeliveryUrl);


  const handleChange = (e: any) => {
    // setOrdersPerPage(Number(e.target.value));
  };

  return (
    <div>
      <form>
        <label>
          Show delivery on
          <select value={'1'} onChange={handleChange}>
            <option value="all">Show all</option>
            
          </select>
        </label>
      </form>
    </div>
  );
};
