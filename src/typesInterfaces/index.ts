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

export interface ArticlesStoreModel {
  articles: ArticleProps[];
  currentArticle: ArticleProps;
  error: string;
  filter: { page?: string; query?: string; hot?: boolean };
  addArticles: Action<ArticlesStoreModel, ArticleProps[]>;
  setError: Action<ArticlesStoreModel, any>;
  resetError: Action<ArticlesStoreModel>;
  getNews: Thunk<ArticlesStoreModel>;
  searchNews: Thunk<ArticlesStoreModel, { page?: string; query?: string }>;
  setCurrentArticle: Action<ArticlesStoreModel, { article: ArticleProps }>;
}
