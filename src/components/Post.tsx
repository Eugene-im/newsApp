import { Box, Skeleton, Typography } from "@mui/material";
import { ArticleProps } from "../typesInterfaces";
import { store } from "../store";
import { Link } from "react-router-dom";

export const Post = ({
  article,
  index,
  ref,
}: {
  article?: ArticleProps;
  index: number;
  ref?: any;
}) => {
  const { setCurrentArticle } = store.getActions();
  const redirectTo = async (href: string) => {
    // Firstly ensure that any outstanding persist operations are complete.
    // Note that this is an asynchronous operation so we will await on it.
    article && setCurrentArticle({ article });
    await store.persist.flush();

    // We can now safely redirect the browser
    window.location.href = href;
  };
  return (
    <Box
      key={article?.id || index}
      sx={{ width: 210, marginRight: 0.5, my: 5 }}
      {...ref}
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
};
