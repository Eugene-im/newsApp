import { action, createStore, persist, thunk } from "easy-peasy";
import { API } from "../core/api";
import {
  ArticleProps,
  ArticlesStoreModel,
  FilterPropsEvery,
} from "../typesInterfaces";
import { errorConverter, updatedDataId } from "../helpers";
import { MOKDATA } from "../mokdata";

const defSource = "bbc-news";
const defPageSize = 10;
const defPage = 1;
const defQuery = "bitcoin";

export const store = createStore<ArticlesStoreModel>(
  persist(
    {
      articles: [],
      currentArticle: {} as ArticleProps,
      filter: {} as FilterPropsEvery,
      error: "",
      isError: false,
      isLoading: false,
      hasNextPage: true,
      setIsLoading: action((state, payload) => {
        state.isLoading = payload;
      }),
      setFilter: action((state, payload) => {
        state.filter = { ...state.filter, ...payload };
      }),
      resetFilter: action((state) => {
        state.filter = {} as FilterPropsEvery;
      }),
      setHasNextPage: action((state, payload) => {
        state.hasNextPage = payload;
      }),
      addArticles: action((state, payload) => {
        state.articles = [...state.articles, ...payload];
      }),
      resetArticles: action((state) => {
        state.articles = [];
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
          actions.setError(`oh no, error happened: ${errorConverter(error)}`);
        }
      }),
      searchNews: thunk(async (actions, payload) => {
        let requestUrl = `/everything?q=${
          payload.q || defQuery
        }&pageSize=${defPageSize}&page=${payload.page || defPage}`;
        if (payload.hot) {
          requestUrl = `/top-headlines?sources=${defSource}&pageSize=${defPageSize}&page=${
            payload.page || defPage
          }`;
        }
        try {
          const res = await API.get(requestUrl);
          const updatedData = updatedDataId(res.data.articles);
          if (Number(payload?.page) === 1 || !payload?.page)
            actions.resetArticles();
          actions.addArticles(updatedData);
        } catch (error) {
          console.error(error);
          actions.setError(`oh no, error happened: ${errorConverter(error)}`);
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
