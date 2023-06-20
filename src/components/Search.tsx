import { OutlinedInput } from "@mui/material";
import { Actions, useStoreActions } from "easy-peasy";
import { ArticlesStoreModel } from "../typesInterfaces";

export const Search = () => {
  const { searchNews, getNews } = useStoreActions((actions: Actions<ArticlesStoreModel>) => actions);

  const hadleSearch = (event: any) => {
    if (event.target.value) {
      searchNews({ query: event.target.value });
    } else {
      getNews();
    }
  };

  const handleBlur = (event: any) => {
    hadleSearch(event);
  };

  const handleKeyDownEnter = (event: any) => {
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
