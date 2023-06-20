import { Link } from "react-router-dom";
import { store } from "../store";

export function NewsDetails() {
  const { currentArticle } = store.getState()

  return (
    <>
      {!currentArticle.title && <h2>Not Found</h2>}
      {currentArticle.title && (
        <>
          <h2>{currentArticle.title}</h2>
          <img src={currentArticle.urlToImage} alt={currentArticle.title} />
          <p>{currentArticle.description}</p>
          <p>
            {currentArticle.content.split("…")[0]}...
            <Link to={currentArticle.url}>read more</Link>
          </p>
          <p>{currentArticle.publishedAt}</p>
          <p>{currentArticle.author}</p>
        </>
      )}
    </>
  );
}
