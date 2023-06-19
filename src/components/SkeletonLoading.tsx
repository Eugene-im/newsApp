import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import { Link } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { ArticlesStoreModel } from "../typesInterfaces";

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
              <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
                {item ? (
                  <Link href={`./news/${item.id}`}>
                    <img
                      style={{ width: 210, height: 118 }}
                      alt={item.title}
                      src={item.urlToImage}
                    />
                  </Link>
                ) : (
                  <Skeleton variant="rectangular" width={210} height={118} />
                )}
                {item ? (
                  <Link href={`./news/${item.id}`}>
                    <Box sx={{ pr: 2 }}>
                      <Typography gutterBottom variant="body2">
                        {item.title}
                      </Typography>
                      <Typography
                        display="block"
                        variant="caption"
                        color="text.secondary"
                      >
                        {item.channel}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {`${item.publishedAt} • ${item.author}`}
                      </Typography>
                    </Box>
                  </Link>
                ) : (
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                )}
              </Box>
            )
          )}
        </Grid>
      </Box>
    </>
  );
}
