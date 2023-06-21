import { useStoreState, useStoreActions, Actions } from "easy-peasy";
import { useRef, useCallback, useEffect } from "react";
import {
  ArticlesStoreModel,
  ArticleProps,
  FilterPropsEvery,
} from "../typesInterfaces";

type TypeRef = {
  disconnect: () => void;
  observe: (post: ArticleProps) => void;
};

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

  const intObserver = useRef<TypeRef>();
  const lastPostRef = useCallback(
    (post: ArticleProps | null) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      })as any;

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
