import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import {
  searchInEnum,
  hotEnum,
  sourcesEnum,
  languageEnum,
  sortByEnum,
  ArticlesStoreModel,
  FilterPropsTop,
} from "../../typesInterfaces";

const filtersList = [
  { id: "searchIn", options: searchInEnum, hot: hotEnum.all },
  { id: "sources", options: sourcesEnum, hot: hotEnum.hot },
  { id: "language", options: languageEnum, hot: hotEnum.all },
  { id: "sortBy", options: sortByEnum, hot: hotEnum.all },
];
export const FilterList = () => {
  const { filter } = useStoreState((state: ArticlesStoreModel) => state);
  const { setFilter } = useStoreActions(
    (actions: Actions<ArticlesStoreModel>) => actions
  );
  const handleChange = (event: React.BaseSyntheticEvent) => {
    setFilter({ [event.target.id]: event.target.value } as any);
    if (event.target.id === "hot") {
      setFilter({} as FilterPropsTop);
      setFilter({ [event.target.id]: event.target.value } as any);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {filtersList.map((filterItem, index) => (
          <div
            key={index}
            className={`${
              filter.hot === filterItem.hot ? "visible" : "hidden"
            }`}
          >
            <label htmlFor={filterItem.id}>{filterItem.id}</label>
            <select
              id={filterItem.id}
              onChange={handleChange}
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            >
              <>
                <option value="not-set">not set</option>
                {Object.values(filterItem.options).map((category, index) => {
                  return (
                    <option key={`${category}-${index}`} value={category}>
                      {category}
                    </option>
                  );
                })}
              </>
            </select>
          </div>
        ))}
        <div>
          <label htmlFor="hot">hot</label>
          <select
            id="hot"
            onChange={handleChange}
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          >
            <option value="not-set">not set</option>
            <option value="hot">hot</option>
            <option value="all">all</option>
          </select>
        </div>
      </div>
    </div>
  );
};
