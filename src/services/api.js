// src/api.js
import axios from "axios";

const API_KEY = "1de4d974-3a97-4e8a-8b21-fbb880e23896";

const api = axios.create({
  baseURL: "http://apirecoleccion.gonzaloandreslucio.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`
  },
  timeout: 15000
});

// Interceptores (opcional)
api.interceptors.request.use(req => {
  console.log(" API request:", req.method.toUpperCase(), req.url);
  return req;
});

api.interceptors.response.use(
  res => res,
  err => {
    console.error(" API error:", err?.response?.status, err?.response?.data);
    return Promise.reject(err);
  }
);

export default api;
