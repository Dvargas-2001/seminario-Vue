
import api from "./api";


export async function getPerfiles() {
  try {
    const res = await api.get("/perfiles");
    // si la API envía { data: [...] } usamos data.data,
    // si envía un array directamente, usamos res.data
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.data)) return res.data.data;
    return [];
  } catch (error) {
    console.error(
      "Error al obtener perfiles:",
      error.response?.data || error.message
    );
    throw error;
  }
}
