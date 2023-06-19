import { action, createStore, persist, thunk } from "easy-peasy";
import { API } from "../core/api";
import { ArticleProps, ArticlesStoreModel } from "../typesInterfaces";
import { v4 as uuidv4 } from "uuid";
import { MOKDATA } from "../mokdata";

export const store = createStore<ArticlesStoreModel>(
  persist({
    articles: [],
    currentArticle: {} as ArticleProps,
    loading: true,
    addArticles: action((state, payload) => {
      state.articles = [...payload];
      console.log(
        "🚀 ~ file: index.ts:13 ~ addArticles:action ~ state.articles:",
        state.articles
      );
      state.loading = false;
    }),
    clearArticles: action((state) => {
      state.articles = [];
    }),
    clearCurrentArticle: action((state) => {
      state.currentArticle = {} as ArticleProps;
    }),
    getNews: thunk(async (actions, payload) => {
      try {
        // TODO - remove this if statement
        if (process.env.NODE_ENV === "development") {
          actions.addArticles(MOKDATA.articles);
        } else {
          const res = await API.get("/top-headlines?sources=bbc-news");
          const updatedData = res.data.articles.map((item: ArticleProps) => {
            return { ...item, id: uuidv4() };
          });
          actions.addArticles(updatedData);
        }
      } catch (error) {
        console.log(error);
      }
    }),
    getCurrentArticle: action((state, payload) => {
      // console.log("🚀 ~ file: index.ts:39 ~ getCurrentArticle:action ~ payload:", payload)
      console.log(
        "🚀 ~ file: index.ts:41 ~ getCurrentArticle:action ~ state:",
        state
      );
      state.currentArticle =
        state.articles.find((article) => article.id === payload.id) ||
        ({} as ArticleProps);
      // console.log("🚀 ~ file: index.ts:42 ~ getCurrentArticle:action ~ state.articles:", state.articles)
      // console.log("🚀 ~ file: index.ts:42 ~ getCurrentArticle:action ~ state.articles.find((article) => article.id === payload.id):", state.articles.filter((article) => article.id === payload.id))
      console.log("🚀 ~ file: index.ts:40 ~ getCurrentArticle:action ~ state.currentArticle:", state.currentArticle)
    }),
  })
);
