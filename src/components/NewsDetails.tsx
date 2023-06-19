import { useEffect } from "react";
import { ArticlesStoreModel } from "../typesInterfaces";
import { Link, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

export function NewsDetails() {
  const { id } = useParams();

  const { currentArticle } = useStoreState(
    (state: ArticlesStoreModel) => state
  );
  const { getCurrentArticle, clearCurrentArticle } = useStoreActions(
    (actions: any) => actions
  );
  useEffect(() => {
    getCurrentArticle({ id });
    return () => {
      clearCurrentArticle();
    };
  }, []);
  return (
    <div>
      {!currentArticle.content && <h2>Not Found</h2>}
      {currentArticle && (
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
    </div>
  );
}
