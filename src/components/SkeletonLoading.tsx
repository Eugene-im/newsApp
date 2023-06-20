import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { ArticlesStoreModel } from "../typesInterfaces";
import { Post } from "./Post";
import { Button } from "@mui/material";

export default function SkeletonLoading() {
  const { articles } = useStoreState((state: ArticlesStoreModel) => state);
  const { getNews, searchNews } = useStoreActions((actions: any) => actions);
  const [count, setCount] = useState(2);
  useEffect(() => {
    if (!articles?.length) getNews();
  }, [articles?.length]);
  return (
    <>
      <Box sx={{ overflow: "hidden" }}>
        <Button
          onClick={() => {
            searchNews({ page: count.toString(), query: "bitcoin" });
            setCount(count + 1);
          }}
        >
          Get more News
        </Button>
        <Grid container wrap="wrap">
          {(!articles.length ? Array.from(new Array(10)) : articles).map(
            (item, index) => (
              <Post key={index} article={item} index={index} />
            )
          )}
        </Grid>
      </Box>
    </>
  );
}
