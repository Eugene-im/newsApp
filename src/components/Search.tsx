import { OutlinedInput } from "@mui/material";
import { Actions, useStoreActions } from "easy-peasy";
import { ArticlesStoreModel } from "../typesInterfaces";

export const Search = () => {
  const { searchNews, getNews } = useStoreActions(
    (actions: Actions<ArticlesStoreModel>) => actions
  );

  const hadleSearch = (event: React.BaseSyntheticEvent) => {
    if (event.target.value) {
      searchNews({ query: event.target.value });
    } else {
      getNews();
    }
  };

  const handleBlur = (event: React.BaseSyntheticEvent) => {
    hadleSearch(event);
  };

  const handleKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      hadleSearch(event);
    }
  };
  return (
    <OutlinedInput
      placeholder="Search"
      onBlur={handleBlur}
      onKeyDown={handleKeyDownEnter}
    />
  );
};
