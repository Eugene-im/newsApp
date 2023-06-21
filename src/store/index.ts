import { action, createStore, persist, thunk } from "easy-peasy";
import { API } from "../core/api";
import { ArticleProps, ArticlesStoreModel } from "../typesInterfaces";
import { errorConverter, updatedDataId } from "../helpers";
import { MOKDATA } from "../mokdata";

export const store = createStore<ArticlesStoreModel>(
  persist(
    {
      articles: [],
      currentArticle: {} as ArticleProps,
      filter: {},
      error: "",
      isError: false,
      isLoading: false,
      hasNextPage: true,
      setIsLoading: action((state, payload) => {
        state.isLoading = payload;
      }),
      setHasNextPage: action((state, payload) => {
        state.hasNextPage = payload;
      }),
      addArticles: action((state, payload) => {
        state.articles = [...state.articles, ...payload];
      }),
      setError: action((state, payload) => {
        state.isError = true;
        state.error = JSON.stringify(payload);
      }),
      resetError: action((state) => {
        state.error = "";
      }),

      getNews: thunk(async (actions) => {
        let data;
        try {
          // TODO - remove this if statement
          if (process.env.NODE_ENV === "development") {
            data = MOKDATA.articles;
          } else {
            const res = await API.get(
              "/top-headlines?sources=bbc-news&pageSize=10"
            );
            data = res.data.articles;
          }
          const updatedData = updatedDataId(data);
          actions.addArticles(updatedData);
        } catch (error) {
          console.log(error);
          actions.setError(
            `oh no, error happened: ${errorConverter(error)}`
          );
        }
      }),
      searchNews: thunk(async (actions, payload) => {
        try {
          const res = await API.get(
            `/everything?q=${payload.query}&searchIn=title&pageSize=10&page=${
              payload.page || 1
            }`
          );
          const updatedData = updatedDataId(res.data.articles);
          actions.addArticles(updatedData);
        } catch (error) {
          console.error(error);
          actions.setError(
            `oh no, error happened: ${errorConverter(error)}`
          );
        }
      }),
      setCurrentArticle: action((state, payload) => {
        state.currentArticle = payload.article;
      }),
    },
    {
      storage: "localStorage",
      mergeStrategy: "mergeShallow",
      allow: ["articles", "currentArticle"],
    }
  )
);
