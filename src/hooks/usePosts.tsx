import { useStoreState, useStoreActions, Actions } from "easy-peasy";
import { useRef, useCallback, useEffect } from "react";
import { ArticlesStoreModel, ArticleProps } from "../typesInterfaces";

const usePosts = (
  pageNum: number,
  setPageNum: React.Dispatch<React.SetStateAction<number>>
) => {
  const { isLoading, isError, hasNextPage } = useStoreState(
    (state: ArticlesStoreModel) => state
  );
  const { searchNews } = useStoreActions(
    (actions: Actions<ArticlesStoreModel>) => actions
  );

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post: ArticleProps | null) => {
      if (isLoading) return;
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
  useEffect(() => {
    isError && lastPostRef(null);
  }, [lastPostRef, isError]);

  useEffect(() => {
    searchNews({ page: pageNum.toString(), query: "bitcoin" });
  }, [pageNum]);
  return lastPostRef;
};

export default usePosts;
