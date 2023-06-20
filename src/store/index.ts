import { action, createStore, persist, thunk } from "easy-peasy";
import { API } from "../core/api";
import { ArticleProps, ArticlesStoreModel } from "../typesInterfaces";
import { updatedDataId } from "../helpers";
import { MOKDATA } from "../mokdata";

export const store = createStore<ArticlesStoreModel>(
  persist(
    {
      articles: [],
      currentArticle: {} as ArticleProps,
      filter: {},
      error: "",
      addArticles: action((state, payload) => {
        console.log(
          "🚀 ~ file: index.ts:19 ~ addArticles:action ~ state.articles:",
          state.articles
        );
        state.articles = [...state.articles, ...payload];
      }),
      setError: action((state, payload) => {
        state.error = JSON.stringify(payload);
      }),
      resetError: action((state) => {
        state.error = "";
      }),
      clearArticles: action((state) => {
        state.articles = [];
      }),
      clearCurrentArticle: action((state) => {
        state.currentArticle = {} as ArticleProps;
      }),
      getNews: thunk(async (actions) => {
        let data;
        try {
          // TODO - remove this if statement
          if (process.env.NODE_ENV === "development") {
            data = MOKDATA.articles;
          } else {
            const res = await API.get(
              "/top-headlines?sources=bbc-news&pageSize=30"
            );
            data = res.data.articles;
          }
          const updatedData = updatedDataId(data);
          actions.addArticles(updatedData);
        } catch (error) {
          console.log(error);
          actions.setError({ error });
        }
      }),
      searchNews: thunk(async (actions, payload) => {
        try {
          const res = await API.get(
            `/everything?q=${payload.query}&searchIn=title&pageSize=20&page=${
              payload.page || 1
            }`
          );
          const updatedData = updatedDataId(res.data.articles);
          // actions.clearArticles();
          actions.addArticles(updatedData);
        } catch (error) {
          console.log(error);
          actions.setError({ error });
        }
      }),
      setCurrentArticle: action((state, payload) => {
        state.currentArticle = payload.article;
      }),
    },
    {
      storage: "localStorage",
      mergeStrategy: "mergeShallow",
      allow: ["articles","currentArticle"],
    }
  )
);
