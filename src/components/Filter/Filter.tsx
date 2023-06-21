import { useState } from "react";
import { Search } from "../Search";
import { FilterList } from "./FilterList";
import { FilterHeader } from "./FilterHeader";

export const Filter = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div>
      <div className="w-full shadow p-5 rounded-lg bg-white">
        <div className="relative">
          <Search />
        </div>
        <FilterHeader showFilter={showFilter} setShowFilter={setShowFilter} />
        {showFilter && <FilterList />}
      </div>
    </div>
  );
};
