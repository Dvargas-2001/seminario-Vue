import axios from "axios";

const baseURL = "http://apirecoleccion.gonzaloandreslucio.com/api";
const key = "1de4d974-3a97-4e8a-8b21-fbb880e23896"; 

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "x-api-key": key,
    "Authorization": `Bearer ${key}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Error en respuesta de la API:", error?.response?.status, error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
