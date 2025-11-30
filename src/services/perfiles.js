import api from "@/api/api";

export const getPerfiles = async () => {
  try {
    const res = await api.get("/perfiles");
    return res.data; 
  } catch (error) {
    console.error("Error al obtener perfiles:", error);
    throw error;
  }
};
