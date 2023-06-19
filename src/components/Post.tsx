import { Box, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ArticleProps } from "../typesInterfaces";

export const Post = ({
  article,
  index,
  ref,
}: {
  article: ArticleProps;
  index: number;
  ref?: any;
}) => {
  return (
    <Box
      key={article.id || index}
      sx={{ width: 210, marginRight: 0.5, my: 5 }}
      {...ref}
    >
      {article.urlToImage ? (
        <Link to={`./news/${article.id}`}>
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
        <Link to={`./news/${article.id}`}>
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
