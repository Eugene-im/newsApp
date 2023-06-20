import Box from "@mui/material/Box";
import InfiniteScroll from "./InfiniteScroll";

export default function SkeletonLoading() {
  return (
    <>
      <Box sx={{ overflow: "hidden" }}>
        <InfiniteScroll />
      </Box>
    </>
  );
}
