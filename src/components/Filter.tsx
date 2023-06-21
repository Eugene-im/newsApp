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
import { useEffect, useState } from "react";
import { Search } from "./Search";

export const Filter = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { filter } = useStoreState((state: ArticlesStoreModel) => state);
  const { setFilter, resetFilter } = useStoreActions(
    (actions: Actions<ArticlesStoreModel>) => actions
  );
  const handleChange = (event: React.BaseSyntheticEvent) => {
    if (event.target.value === "not-set") {
      //@ts-ignore
      delete filter[event.target.id];
      setFilter(filter);
    } else {
      setFilter({ [event.target.id]: event.target.value } as any);
    }
  };
  const handleReset = () => {
    resetFilter();
  };

  useEffect(() => {
    console.log(new URLSearchParams(filter as any).toString());
  }, [filter]);

  const filtersList = [
    { id: "searchIn", options: searchInEnum },
    { id: "category", options: categoryEnum },
    { id: "country", options: countryEnum },
    { id: "sources", options: sourcesEnum },
    { id: "language", options: languageEnum },
    { id: "sortBy", options: sortByEnum },
    { id: "hot", options: hotEnum },
  ];
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
              {filtersList.map((filter, index) => (
                <div key={index}>
                  <label htmlFor={filter.id}>{filter.id}</label>
                  <select
                    id={filter.id}
                    onChange={handleChange}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  >
                    <>
                      <option value="not-set">not set</option>
                      {Object.values(filter.options).map((category, index) => {
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
