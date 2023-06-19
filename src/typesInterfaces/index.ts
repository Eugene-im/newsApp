import { Action, Thunk } from "easy-peasy";

export interface ArticleProps {
  id?: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsComponentProps {
  news?: ArticleProps[];
}

export interface ApiResponse {
  status: string;
  totalResults: number;
  articles: ArticleProps[];
}
export interface ArticleActions {
  addArticles: Action<ArticlesStoreModel, ArticleProps[]>;
  clearArticles: Action<ArticlesStoreModel>;
  clearCurrentArticle: Action<ArticlesStoreModel>;
  setError: Action<ArticlesStoreModel, any>;
  resetError: Action<ArticlesStoreModel>;
  getNews: Thunk<ArticlesStoreModel, ApiResponse>;
  searchNews: Thunk<ArticlesStoreModel, string>;
  getCurrentArticle: Action<ArticlesStoreModel, { id: string }>;
}

export interface ArticlesStoreModel
  extends ArticleActions {
  articles: ArticleProps[];
  currentArticle: ArticleProps;
  loading: boolean;
  error: string;
}
