export const FilterHeader = ({
  showFilter,
  setShowFilter,
}: {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <p className="font-medium  mr-4">Filters</p>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
        >
          {!showFilter ? "show" : "hide"}
        </button>
      </div>
    </div>
  );
};
