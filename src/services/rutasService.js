import api from "./api";

export const getRutas = async () => {
  try {
    const response = await api.get("/rutas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las rutas:", error);
    throw error;
  }
};

export const crearRuta = async (rutaData) => {
  try {
    const response = await api.post("/rutas", rutaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la ruta:", error.response?.data || error.message);
    throw error;
  }
};
