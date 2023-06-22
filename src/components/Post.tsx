import React, { LegacyRef } from "react";
import { ArticleProps, ArticlesStoreModel } from "../typesInterfaces";
import { store } from "../store/store";
import { Actions, useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import { SkeletonImage, SkeletonText } from "./Skeleton";

const Post = React.forwardRef(
  (
    { article }: { article: ArticleProps },
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => {
    const { setCurrentArticle } = useStoreActions(
      (actions: Actions<ArticlesStoreModel>) => actions
    );

    const redirectTo = async (href: string) => {
      article && setCurrentArticle({ article: article });
      await store.persist.flush();
      window.location.href = href;
    };

    const articleBody = (
      <>
        <div
          ref={ref}
          role="status"
          className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 margin-bottom-2 margin-right-2 w-full"
        >
          {article?.urlToImage ? (
            <Link
              to={`./news/${article.id}`}
              onClick={(e) => {
                e.preventDefault();
                redirectTo(`./news/${article.id}`);
              }}
            >
              <div className="flex items-center justify-center h-48 mb-4 rounded">
                <img
                  style={{ width: 210, height: 118 }}
                  alt={article.title}
                  src={article.urlToImage}
                />
              </div>
            </Link>
          ) : (
            <SkeletonImage />
          )}

          {article ? (
            <Link
              to={`./news/${article.id}`}
              onClick={(e) => {
                e.preventDefault();
                redirectTo(`./news/${article.id}`);
              }}
            >
              <div>
                <div className="text-md text-gray-900 font-semibold">
                  {article.title}
                </div>
                <div className="text-sm text-gray-500">
                  {article?.description?.slice(0, 100)}...
                </div>
                <div className="text-sm text-gray-500">
                  {`${article.publishedAt} • ${
                    article.author ? article.author : ""
                  }`}
                </div>
              </div>
            </Link>
          ) : (
            <SkeletonText />
          )}
        </div>
      </>
    );

    const content = ref ? (
      <article ref={ref}>{articleBody}</article>
    ) : (
      <article>{articleBody}</article>
    );

    return content;
  }
);

export default Post;
