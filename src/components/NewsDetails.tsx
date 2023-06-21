import { useStoreState } from "easy-peasy";
import { ArticlesStoreModel } from "../typesInterfaces";

export function NewsDetails() {
  const { currentArticle } = useStoreState(
    (state: ArticlesStoreModel) => state
  );

  return (
    <>
      {!currentArticle.title && <h2>Not Found</h2>}
      {currentArticle.title && (
        <div className="p-5 bg-white dark:bg-gray-900 antialiased ">
          <img src={currentArticle.urlToImage} alt={currentArticle.title} />

          <h2 className="text-4xl font-extrabold dark:text-white">
            {currentArticle.title}
          </h2>
          <p className="my-4 text-lg text-gray-500">
            {currentArticle.description}
          </p>
          <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
            {currentArticle.content.split("…")[0]}...
          </p>
          <a
            href={currentArticle.url}
            className="inline-flex items-center text-lg text-blue-600 dark:text-blue-500 hover:underline"
          >
            Read more
            <svg
              className="w-6 h-6 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            {currentArticle.publishedAt} | {currentArticle.author}
          </p>
        </div>
      )}
    </>
  );
}
