import axios from "axios";

// const service = vaultService();

const axiosConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  apiKey: process.env.REACT_APP_NEWS_API_KEY,
};

const instance = axios.create(axiosConfig);

instance.interceptors.request.use(
  async (req) => {
    const accessToken = axiosConfig.apiKey;
    if (accessToken && req.headers) {
      req.headers.from = new Date().toISOString();
      req.headers.apiKey = accessToken;
    }
    return req;
  },
  (err) => {
    throw err;
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
