import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import {
    ArticlesStoreModel,
    categoryEnum,
    countryEnum,
    hotEnum,
    languageEnum,
    searchInEnum,
    sortByEnum,
    sourcesEnum,
} from "../typesInterfaces";
import { useState } from "react";
import { Search } from "./Search";

const filtersList = [
  { id: "searchIn", options: searchInEnum, hot: hotEnum.all },
  { id: "sources", options: sourcesEnum, hot: hotEnum.hot },
  { id: "category", options: categoryEnum, hot: hotEnum.hot },
  { id: "country", options: countryEnum, hot: hotEnum.hot },
  { id: "language", options: languageEnum, hot: hotEnum.all },
  { id: "sortBy", options: sortByEnum, hot: hotEnum.all },
];

export const Filter = () => {
  const [showFilter, setShowFilter] = useState(false);

  const { filter } = useStoreState((state: ArticlesStoreModel) => state);
  const { setFilter, resetFilter } = useStoreActions(
    (actions: Actions<ArticlesStoreModel>) => actions
  );
  
  const handleChange = (event: React.BaseSyntheticEvent) => {
    setFilter({ [event.target.id]: event.target.value } as any);
  };
  const handleReset = () => {
    resetFilter();
  };

  return (
    <div>
      <div className="w-full shadow p-5 rounded-lg bg-white">
        <div className="relative">
          <Search />
        </div>
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
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
          >
            Reset Filter
          </button>
        </div>
        {showFilter && (
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
                    //@ts-ignore
                    defaultChecked={filter[filterItem.id] || "not-set"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  >
                    <>
                      <option value="not-set">not set</option>
                      {Object.values(filterItem.options).map(
                        (category, index) => {
                          return (
                            <option
                              key={`${category}-${index}`}
                              value={category}
                            >
                              {category}
                            </option>
                          );
                        }
                      )}
                    </>
                  </select>
                </div>
              ))}
              <div>
                <label htmlFor="hot">hot</label>
                <select
                  id="hot"
                  //@ts-ignore
                  defaultChecked={filter.hot}
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
        )}
      </div>
    </div>
  );
};
