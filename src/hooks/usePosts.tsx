import { useState, useEffect } from "react";
// import { getPostsPage } from '../api/axios'

import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPostsPage = async (pageParam = 1, options = {}) => {
  const response = await api.get(`/posts?_page=${pageParam}`, options);
  return response.data;
};

const usePosts = (pageNum = 1) => {
  const [results, setResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getPostsPage(pageNum, { signal })
      .then((data) => {
        setResults((prev: any) => [...prev, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [pageNum]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;
