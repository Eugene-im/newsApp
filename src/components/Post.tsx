import React from "react";
import { ArticleProps, ArticlesStoreModel } from "../typesInterfaces";
import { store } from "../store";
import { Box, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Actions, useStoreActions } from "easy-peasy";

const Post = React.forwardRef(({ article }: { article: ArticleProps }, ref) => {
  const { setCurrentArticle } = useStoreActions((actions: Actions<ArticlesStoreModel>) => actions);
  const redirectTo = async (href: string) => {
    article && setCurrentArticle({ article: article });
    await store.persist.flush();
    window.location.href = href;
  };
  const articleBody = (
    <Box
      sx={{ width: 210, marginRight: 0.5, my: 5 }}
      ref={ref}
    >
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
      {article ? (
        <Link
          to={`./news/${article.id}`}
          onClick={(e) => {
            e.preventDefault();
            redirectTo(`./news/${article.id}`);
          }}
        >
          <Box sx={{ pr: 2 }}>
            <Typography gutterBottom variant="body2">
              {article.title}
            </Typography>
            <Typography
              display="block"
              variant="caption"
              color="text.secondary"
            >
              {article.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {`${article.publishedAt} • ${article.author}`}
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
