import FilterDropdown from "./FilterBy";
import RangeMinToMax from "./RangeMinToMax";

const RangeAndFilter = ({setPriceRange, setSort}) => {
    return (
        <div className="flex justify-between items-start gap-1 ">
            <RangeMinToMax setPriceRange={setPriceRange}></RangeMinToMax>
            <FilterDropdown setSort={setSort}></FilterDropdown>
        </div>
    );
};

export default RangeAndFilter;