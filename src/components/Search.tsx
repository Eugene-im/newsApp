import { Actions, useStoreActions } from "easy-peasy";
import { ArticlesStoreModel, FilterPropsEvery } from "../typesInterfaces";
import { useState } from "react";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const { searchNews } = useStoreActions(
    (actions: Actions<ArticlesStoreModel>) => actions
  );

  const handleSearch = (value: string) => {
    let query;
    if (value) {
      query = { q: value } as FilterPropsEvery;
    } else {
      query = {} as FilterPropsEvery;
    }
    searchNews(query as FilterPropsEvery);
  };

  const handleKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(searchValue);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  
  const handleClick = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    handleSearch(searchValue);
  };
  
  return (
    <div>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          required
          onKeyDown={handleKeyDownEnter}
          onChange={handleChange}
        />
        <button
          type="button"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleClick}
        >
          Search
        </button>
      </div>
    </div>
  );
};
