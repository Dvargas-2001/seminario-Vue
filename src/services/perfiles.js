import api from "../api";

export const getPerfiles = async () => {
  try {
    const response = await api.get("/perfiles");
    return response.data;
  } catch (error) {
    console.error("Error al obtener perfiles:", error);
    throw error;
  }
};
