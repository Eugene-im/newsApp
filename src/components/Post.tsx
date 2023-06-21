import React from "react";
import { ArticleProps, ArticlesStoreModel } from "../typesInterfaces";
import { store } from "../store";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { Actions, useStoreActions } from "easy-peasy";

const Post = React.forwardRef(({ article }: { article: ArticleProps }, ref) => {
  const { setCurrentArticle } = useStoreActions(
    (actions: Actions<ArticlesStoreModel>) => actions
  );
  const redirectTo = async (href: string) => {
    article && setCurrentArticle({ article: article });
    await store.persist.flush();
    window.location.href = href;
  };
  const articleBody = (
    <div
      className="w-64 mr-2 my-5 bg-gray-100 rounded-lg shadow-sm"
      // @ts-ignore
      ref={ref}
    >
      <div className="w-full h-36 flex align-middle justify-center p-2">
        {article?.urlToImage ? (
          <Link
            to={`./news/${article.id}`}
            onClick={(e) => {
              e.preventDefault();
              redirectTo(`./news/${article.id}`);
            }}
          >
            <img
              style={{ width: 210, height: 118 }}
              alt={article.title}
              src={article.urlToImage}
            />
          </Link>
        ) : (
          <Skeleton variant="rectangular" width={210} height={118} />
        )}
      </div>
      <div className="w-full flex align-middle justify-center p-2">
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
              <div className="text-sm text-gray-500">{article.description}</div>
              <div className="text-sm text-gray-500">
                {`${article.publishedAt} • ${
                  article.author ? article.author : ""
                }`}
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-1">
            <Skeleton />
            <Skeleton width="60%" />
          </div>
        )}
      </div>
    </div>
  );

  const content = ref ? (
    // @ts-ignore
    <article ref={ref}>{articleBody}</article>
  ) : (
    <article>{articleBody}</article>
  );

  return content;
});

export default Post;
