import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import {
  searchInEnum,
  languageEnum,
  sortByEnum,
  ArticlesStoreModel,
  EverythingReqSearchProps,
} from "../../typesInterfaces";

const filtersList = [
  { id: "searchIn", options: searchInEnum },
  { id: "language", options: languageEnum },
  { id: "sortBy", options: sortByEnum },
];

export const FilterList = () => {
  const { filter } = useStoreState((state: ArticlesStoreModel) => state);
  const { setFilter } = useStoreActions(
    (actions: Actions<ArticlesStoreModel>) => actions
  );
  const handleChange = (event: React.BaseSyntheticEvent) => {
    setFilter({ [event.target.id]: event.target.value } as any);
    if (event.target.id === "hot") {
      setFilter({} as EverythingReqSearchProps);
      setFilter({ [event.target.id]: event.target.value } as any);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {filtersList.map((filterItem,index) => (
          <div key={index}>
            
            <label htmlFor={filterItem.id}>{filterItem.id}</label>
            <select
              id={filterItem.id}
              // @ts-ignore
              value={filter[filterItem.id]||"not-set"}
              onChange={handleChange}
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            >
              <>
                <option defaultValue="not-set" value="not-set">not set</option>
                {Object.values(filterItem.options).map((category,index) => {
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
  );
};
