import { SortDirection } from "../../types";

interface SortDirectionProps {
    direction: SortDirection;
    setDirection: (dir: SortDirection) => void;
}
export const ChangeSortDirection = (props: SortDirectionProps): JSX.Element => {
    const { direction, setDirection } = props;
    const buttonTxt = `Sort orders ${direction === 'asc' ? 'oldest to newest' : 'newest to oldest'}`
    
    const handleSortChange = () => {
        setDirection(direction === 'asc' ? 'desc' : 'asc');
    }
    return (
        <button onClick={handleSortChange}>{buttonTxt}</button>
    )
}