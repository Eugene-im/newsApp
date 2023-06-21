import { useStoreState, useStoreActions, Actions } from "easy-peasy";
import { useRef, useCallback, useEffect } from "react";
import {
  ArticlesStoreModel,
  ArticleProps,
  FilterPropsEvery,
} from "../typesInterfaces";

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

  const intObserver = useRef<HTMLDivElement>();
  const lastPostRef = useCallback(
    (post: ArticleProps | null) => {
      if (isLoading) return;
      // TODO: remove ts-ignore
      //@ts-ignore

      if (intObserver.current) intObserver.current.disconnect();
      //@ts-ignore

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });
      //@ts-ignore

      if (post && intObserver.current) intObserver.current.observe(post);
    },
    // eslint-disable-next-line
    [isLoading, hasNextPage]
  );
  useEffect(() => {
    isError && lastPostRef(null);
  }, [lastPostRef, isError]);

  useEffect(() => {
    searchNews({ page: pageNum } as FilterPropsEvery);
  }, [pageNum, searchNews]);
  return lastPostRef;
};

export default usePosts;
