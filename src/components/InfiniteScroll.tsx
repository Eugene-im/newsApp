import { useState } from "react";
import { ArticleProps, ArticlesStoreModel } from "../typesInterfaces";
import Post from "./Post";
import { useStoreState } from "easy-peasy";
import usePosts from "../hooks/usePosts";

const InfiniteScroll = () => {
  const [pageNum, setPageNum] = useState(1);
  const lastPostRef = usePosts(pageNum, setPageNum);

  const { isLoading, articles } = useStoreState(
    (state: ArticlesStoreModel) => state
  );
  const content = articles.map((post: ArticleProps, i: number) => {
    if (articles.length === i + 1) {
      return <Post key={post.id} ref={lastPostRef} article={post}/>;
    }
    return <Post key={post.id} article={post} />;
  });

  return (
    <>
      <div className="grid grid-flow-row-dense grid-cols-3 gap-10">
        {content}
      </div>
      {isLoading && <p className="center">Loading More Posts...</p>}
      <a href="#top">Back to Top</a>
    </>
  );
};
export default InfiniteScroll;
