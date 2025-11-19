import api from "./api";

// Obtener vehículos
export async function obtenerVehiculos() {
  try {
    const res = await api.get("/vehiculos");
    return res.data?.data || [];
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    throw error;
  }
}

// Registrar vehículo
export async function registrarVehiculo(datos) {
  try {
    const res = await api.post("/vehiculos", datos);
    return res.data;
  } catch (error) {
    console.error("Error al registrar vehículo:", error);
    throw error;
  }
}

// Actualizar vehículo
export async function actualizarVehiculo(id, datos) {
  try {
    const res = await api.put(`/vehiculos/${id}`, datos);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar vehículo:", error);
    throw error;
  }
}

// Eliminar vehículo
export async function eliminarVehiculo(id) {
  try {
    const res = await api.delete(`/vehiculos/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    throw error;
  }
}

// ------------------------------
// Alias pedidos por el profesor
// ------------------------------

// Crear vehículo (alias)
export async function crearVehiculo(datos) {
  return await registrarVehiculo(datos);
}

// Obtener vehículos (alias)
export async function getVehiculos() {
  return await obtenerVehiculos();
}
