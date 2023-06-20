import { useState, useRef, useCallback } from "react";
import usePosts from "../hooks/usePosts";
import { ArticleProps, ArticlesStoreModel } from "../typesInterfaces";
import Post from "./Post";
import { Grid } from "@mui/material";
import { Actions, useStoreActions } from "easy-peasy";
import { ErrorToast } from "./ErrorToast";

const InfiniteScroll = () => {
  const [pageNum, setPageNum] = useState(1);
  // const { error } = useStoreState((state: ArticlesStoreModel) => state);

  const { setError } = useStoreActions(
    (actions: Actions<ArticlesStoreModel>) => actions
  );
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum);

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post: ArticleProps) => {
      if (isLoading || isError) return;
      //@ts-ignore
      if (intObserver.current) intObserver.current.disconnect();
      //@ts-ignore

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!");
          setPageNum((prev) => prev + 1);
        }
      });
      //@ts-ignore
      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) setError({ error: error?.message || error });

  const content = results.map((post: ArticleProps, i: number) => {
    if (results.length === i + 1) {
      return <Post key={post.id} ref={lastPostRef} article={post} />;
    }
    return <Post key={post.id} article={post} />;
  });

  return (
    <>
      <Grid container wrap="wrap">
        {content}
      </Grid>
      {isLoading && <p className="center">Loading More Posts...</p>}
      <a href="#top">Back to Top</a>
      {!!error && <ErrorToast message={error as any} />}
    </>
  );
};
export default InfiniteScroll;
