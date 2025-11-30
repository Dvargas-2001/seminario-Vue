// src/services/api.js
import axios from "axios";

const API_KEY = "1de4d974-3a97-4e8a-8b21-fbb880e23896";

const api = axios.create({
  baseURL: "https://apirecoleccion.gonzaloandreslucio.com/api",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${API_KEY}`;
    console.log("[API REQUEST]", config.method?.toUpperCase(), config.baseURL + config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      console.error("[API ERROR]", err.response.status, err.response.data);
    } else if (err.request) {
      console.error("[API ERROR] Sin respuesta del servidor", err.message);
    } else {
      console.error("[API ERROR] Error al configurar la petición", err.message);
    }
    return Promise.reject(err);
  }
);

export default api;
