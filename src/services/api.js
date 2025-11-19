import axios from 'axios';

const API_KEY = "1de4d974-3a97-4e8a-8b21-fbb880e23896";

const api = axios.create({
  baseURL: "http://apirecoleccion.gonzaloandreslucio.com/api",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(config => {
  console.log("API request:", config.method.toUpperCase(), config.url);
  config.headers.Authorization = `Bearer ${API_KEY}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    console.error("API error:", err?.response?.status, err?.response?.data);
    return Promise.reject(err);
  }
);

export default api;
