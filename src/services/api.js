// src/services/api.js
import axios from 'axios';

// 🔧 Base URL dinámica
// Si tienes .env.development puedes configurar:
// VITE_API_BASE_URL=http://apirecoleccion.gonzaloandreslucio.com
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

// 🧠 Instancia principal de Axios
const api = axios.create({
  baseURL,
  timeout: 10000,
});

// 🚦 Interceptor (opcional): para agregar token o logs
api.interceptors.request.use(config => {
  // Ejemplo: config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
