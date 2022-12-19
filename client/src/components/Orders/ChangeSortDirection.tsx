import { SortDirection } from "../../types";

interface SortDirectionProps {
    direction: SortDirection;
    setDirection: (dir: SortDirection) => void;
}
export const ChangeSortDirection = (props: SortDirectionProps): JSX.Element => {
    const { direction, setDirection } = props;
    const buttonTxt = `Sort orders ${direction === 'asc' ? 'newest to oldest' : 'oldest to newest'}`
    
    const handleSortChange = () => {
        setDirection(direction === 'asc' ? 'desc' : 'asc');
    }
    return (
        <button onClick={handleSortChange}>{buttonTxt}</button>
    )
}