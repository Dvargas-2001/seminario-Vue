import api from "./api";

export async function obtenerVehiculos() {
  try {
    const res = await api.get("/vehiculos");
    console.log("Vehículos obtenidos:", res.data);
    return res.data?.data || res.data || [];
  } catch (error) {
    console.error(" Error al obtener vehículos:", error);
    throw error;
  }
}

export async function registrarVehiculo(datos) {
  try {
    const res = await api.post("/vehiculos", datos);
    console.log(" Vehículo registrado:", res.data);
    return res.data;
  } catch (error) {
    console.error(" Error al registrar vehículo:", error);
    throw error;
  }
}

export async function actualizarVehiculo(id, datos) {
  try {
    const res = await api.put(`/vehiculos/${id}`, datos);
    console.log(" Vehículo actualizado:", res.data);
    return res.data;
  } catch (error) {
    console.error(" Error al actualizar vehículo:", error);
    throw error;
  }
}

export async function eliminarVehiculo(id) {
  try {
    const res = await api.delete(`/vehiculos/${id}`);
    console.log(" Vehículo eliminado:", res.data);
    return res.data;
  } catch (error) {
    console.error(" Error al eliminar vehículo:", error);
    throw error;
  }
}
