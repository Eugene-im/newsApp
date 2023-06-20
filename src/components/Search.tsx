import { OutlinedInput } from "@mui/material";
import { store } from "../store";

export const Search = () => {
  const { searchNews, getNews } = store.getActions();

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
