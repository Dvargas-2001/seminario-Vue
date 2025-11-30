<template>
  <div class="vehiculos-container">
    <h1 class="titulo"> Lista de Vehículos</h1>

    <button @click="cargarVehiculos" class="btn-recargar"> Recargar Lista</button>

    <div v-if="cargando" class="mensaje">Cargando vehículos...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="vehiculos.length" class="tabla">
      <thead>
  <tr>
    <th>ID</th>
    <th>Placa</th>
    <th>Tipo</th>
    <th>Capacidad (kg)</th>
    <th>Acciones</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="v in vehiculos" :key="v.id">
    <td>{{ v.id }}</td>
    <td>{{ v.placa }}</td>
    <td>{{ v.tipo || "Sin tipo" }}</td>
    <td>{{ v.capacidad ?? "Sin capacidad" }}</td>
    <td>
      <button class="btn-editar" @click="editarVehiculo(v)"> Editar</button>
      <button class="btn-eliminar" @click="borrarVehiculo(v.id)"> Eliminar</button>
    </td>
  </tr>
</tbody>
    </table>

    <div v-else-if="!cargando" class="sin-datos">
       No hay vehículos registrados.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenerVehiculos, eliminarVehiculo } from "@/services/vehiculosService";

const vehiculos = ref([]);
const cargando = ref(false);
const error = ref("");

async function cargarVehiculos() {
  cargando.value = true;
  error.value = "";

  console.warn("🔎 Cargando vehículos desde API REAL...");

  try {
    vehiculos.value = await obtenerVehiculos();
    console.warn("🔍 Respuesta API:", vehiculos.value);
  } catch (err) {
    console.error("❌ Error en cargarVehiculos:", err);
    error.value = " No se pudo conectar con la API del profesor.";
  } finally {
    cargando.value = false;
  }
}

async function borrarVehiculo(id) {
  if (!confirm("¿Seguro que deseas eliminar este vehículo?")) return;

  try {
    await eliminarVehiculo(id);
    vehiculos.value = vehiculos.value.filter((v) => v.id !== id);
    alert(" Vehículo eliminado correctamente.");
  } catch (err) {
    alert(" No se pudo eliminar el vehículo.");
  }
}

function editarVehiculo(v) {
  alert(` Editar vehículo: ${v.placa}`);
}

onMounted(() => {
  cargarVehiculos();
});
</script>

<style scoped>
.vehiculos-container {
  padding: 30px;
  background: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: auto;
}

.titulo {
  font-size: 26px;
  color: #1e3a8a;
  margin-bottom: 15px;
  text-align: center;
}

.tabla {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.tabla th,
.tabla td {
  border: 1px solid #e5e7eb;
  padding: 10px;
  text-align: center;
}

.btn-recargar {
  background-color: #2563eb;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-recargar:hover {
  background-color: #1d4ed8;
}

.btn-editar {
  background: #facc15;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
}

.btn-eliminar {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;
}

.error {
  color: red;
  font-weight: 600;
  text-align: center;
  margin: 10px 0;
}

.sin-datos {
  color: #6b7280;
  text-align: center;
  margin-top: 15px;
}
</style>
