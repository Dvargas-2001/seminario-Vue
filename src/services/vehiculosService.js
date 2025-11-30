// src/services/vehiculosService.js
import api from "./api";

// Registrar un vehículo: POST /vehiculos
export async function registrarVehiculo(datos) {
  try {
    const res = await api.post("/vehiculos", datos);
    return res.data;
  } catch (error) {
    console.error(
      "Error al registrar vehículo:",
      error.response?.data || error.message
    );
    throw error;
  }
}
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

// Alias pedidos por el profesor
export async function crearVehiculo(datos) {
  return registrarVehiculo(datos);
}

export async function getVehiculos() {
  return obtenerVehiculos();
}
