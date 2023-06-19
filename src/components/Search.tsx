import { OutlinedInput } from "@mui/material";
import { useStoreActions } from "easy-peasy";

export const Search = () => {
  const { searchNews, getNews } = useStoreActions((actions: any) => actions);

  const hadleSearch = (event: any) => {
    if (event.target.value) {
      searchNews(event.target.value);
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
