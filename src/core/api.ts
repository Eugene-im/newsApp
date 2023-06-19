import axios from "axios";

const axiosConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  apiKey: process.env.REACT_APP_NEWS_API_KEY,
};

const instance = axios.create(axiosConfig);

instance.interceptors.request.use(
  (req) => {
    req.headers["Authorization"] = `Bearer ${axiosConfig.apiKey}`;
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      window.location.href = `${window.location.origin}/denied`;
    }
    throw err;
  }
);

const API = instance;

export { API };
