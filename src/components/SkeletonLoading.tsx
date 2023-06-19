import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { ArticlesStoreModel } from "../typesInterfaces";
import { Post } from "./Post";

export default function SkeletonLoading() {
  const { articles, loading } = useStoreState(
    (state: ArticlesStoreModel) => state
  );
  const { getNews } = useStoreActions((actions: any) => actions);
  useEffect(() => {
    getNews();
  }, []);
  return (
    <>
      <Box sx={{ overflow: "hidden" }}>
        <Grid container wrap="wrap">
          {(loading ? Array.from(new Array(10)) : articles).map(
            (item, index) => (
              <Post key={index} article={item} index={index} />
            )
          )}
        </Grid>
      </Box>
    </>
  );
}
