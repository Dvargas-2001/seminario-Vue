// src/services/vehiculosService.js
import api from "./api";

// ─────────────────────────────────────────────
//  LISTAR VEHÍCULOS  ➜  GET /api/vehiculos
//  (si la API responde 422, veremos el error en consola)
// ─────────────────────────────────────────────
export async function obtenerVehiculos() {
  try {
    const res = await api.get("/vehiculos");
    // soporta tanto { data: [...] } como [ ... ]
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.data)) return res.data.data;
    return [];
  } catch (error) {
    console.error(
      "Error al obtener vehículos:",
      error.response?.data || error.message
    );
    // devolvemos array vacío para que la UI no explote
    return [];
  }
}

// Alias que algunos componentes usan
export const getVehiculos = obtenerVehiculos;

// ─────────────────────────────────────────────
//  REGISTRAR VEHÍCULO  ➜  POST /api/vehiculos
// ─────────────────────────────────────────────
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

// Alias para compatibilidad con código viejo
export const crearVehiculo = registrarVehiculo;

// ─────────────────────────────────────────────
//  ACTUALIZAR VEHÍCULO  ➜  PUT /api/vehiculos/{id}
// ─────────────────────────────────────────────
export async function actualizarVehiculo(id, datos) {
  try {
    const res = await api.put(`/vehiculos/${id}`, datos);
    return res.data;
  } catch (error) {
    console.error(
      "Error al actualizar vehículo:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// ─────────────────────────────────────────────
//  ELIMINAR VEHÍCULO  ➜  DELETE /api/vehiculos/{id}
// ─────────────────────────────────────────────
export async function eliminarVehiculo(id) {
  try {
    const res = await api.delete(`/vehiculos/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      "Error al eliminar vehículo:",
      error.response?.data || error.message
    );
    throw error;
  }
}
