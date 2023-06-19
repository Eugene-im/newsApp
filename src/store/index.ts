import { action, createStore, persist, thunk } from "easy-peasy";
import { API } from "../core/api";
import { ArticleProps, ArticlesStoreModel } from "../typesInterfaces";
import { updatedDataId } from "../helpers";
import { MOKDATA } from "../mokdata";

export const store = createStore<ArticlesStoreModel>(
  persist({
    articles: [],
    currentArticle: {} as ArticleProps,
    loading: true,
    error: "",
    addArticles: action((state, payload) => {
      state.articles = [...payload];
      state.loading = false;
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
    getNews: thunk(async (actions, payload) => {
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
        const res = await API.get(`/everything?q=${payload}&searchIn=title`);
        const updatedData = updatedDataId(res.data.articles);
        actions.addArticles(updatedData);
      } catch (error) {
        console.log(error);
        actions.setError({ error });
      }
    }),
    getCurrentArticle: action((state, payload) => {
      state.currentArticle =
        state.articles.find((article) => article.id === payload.id) ||
        ({} as ArticleProps);
    }),
  })
);
