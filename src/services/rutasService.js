import api from "./api";

function extraerLista(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export const getRutas = async () => {
  try {
    const response = await api.get("/rutas");
    return extraerLista(response.data);
  } catch (error) {
    console.error("Error al obtener las rutas:", error.response?.data || error.message);
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

// 👇 alias para que FormRuta.vue NO rompa
export const createRuta = crearRuta;
