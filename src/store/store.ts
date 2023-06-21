import { Actions, action, createStore, persist, thunk } from "easy-peasy";
import { API } from "../core/api";
import {
  ArticleProps,
  ArticlesStoreModel,
  FilterPropsEvery,
  FilterPropsTop,
  hotEnum,
} from "../typesInterfaces";
import { errorConverter, filterConverter, updatedDataId } from "../helpers";

const defFilter = {
  sources: "bbc-news",
  pageSize: 10,
  page: 1,
  q: "bitcoin",
};

const requestFunc = async (
  actions: Actions<ArticlesStoreModel>,
  payload: FilterPropsTop | FilterPropsEvery,
  helpers: any
) => {
  let requestUrl;
  const { filter } = helpers.getState();
  let mergedFilter = { ...filter, ...payload };
  if (filter.hot === hotEnum.hot) {
    delete mergedFilter.q;
    const filterUrl = filterConverter(mergedFilter);
    requestUrl = `/top-headlines?${filterUrl}`;
  } else {
    const filterUrl = filterConverter(mergedFilter);
    requestUrl = `/everything?${filterUrl}`;
  }

  try {
    const res = await API.get(requestUrl);
    const updatedData = updatedDataId(res.data.articles);
    if (Number(payload?.page) === 1 || !payload?.page) actions.resetArticles();
    actions.addArticles(updatedData);
  } catch (error) {
    console.error(error);
    actions.setError(`oh no, error happened: ${errorConverter(error)}`);
  }
};

export const store = createStore<ArticlesStoreModel>(
  persist(
    {
      articles: [],
      currentArticle: {} as ArticleProps,
      filter: { ...defFilter } as FilterPropsEvery,
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
      setFilter: action((state, payload) => {
        state.filter = { ...state.filter, ...payload };
      }),
      resetFilter: action((state) => {
        state.filter = {} as FilterPropsEvery;
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
      searchNews: thunk(requestFunc),
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
