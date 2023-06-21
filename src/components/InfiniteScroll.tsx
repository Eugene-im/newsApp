import { Ref, useState } from "react";
import { ArticleProps, ArticlesStoreModel } from "../typesInterfaces";
import Post from "./Post";
import { useStoreState } from "easy-peasy";
import usePosts from "../hooks/usePosts";
import { Filter } from "./Filter/Filter";

const InfiniteScroll = () => {
  const [pageNum, setPageNum] = useState(1);

  const lastPostRef = usePosts(pageNum, setPageNum);

  const { isLoading, articles } = useStoreState(
    (state: ArticlesStoreModel) => state
  );
  const content = articles.map((post: ArticleProps, i: number) => {
    if (articles.length === i + 1) {
      return (
        <Post
          key={post.id}
          ref={lastPostRef as Ref<HTMLDivElement>}
          article={post}
        />
      );
    }
    return <Post key={post.id} article={post} />;
  });

  return (
    <div className="overflow-hidden">
      <Filter />
      <div className="grid my-5 mx-auto grid-flow-row-dense md:grid-cols-3 sm:grid-cols-1 sm:place-items-center md:place-items-start gap-10">
        {content}
      </div>
      {isLoading && <p className="center">Loading More Posts...</p>}
      <a href="#top">Back to Top</a>
    </div>
  );
};
export default InfiniteScroll;
