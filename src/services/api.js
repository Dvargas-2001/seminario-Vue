import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://apirecoleccion.gonzaloandreslucio.com/api";
const API_KEY = import.meta.env.VITE_API_KEY || "1de4d974-3a97-4e8a-8b21-fbb880e23896";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});

// Interceptor REQUEST
api.interceptors.request.use(
  config => {
    console.log("API request:", config.method.toUpperCase(), config.url);

    if (API_KEY) {
      config.headers.Authorization = `Bearer ${API_KEY}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

// Interceptor RESPONSE
api.interceptors.response.use(
  res => res,
  err => {
    console.error(
      "API error:",
      err?.response?.status,
      err?.response?.data || err.message
    );

    return Promise.reject(err.response || err);
  }
);

export default api;
