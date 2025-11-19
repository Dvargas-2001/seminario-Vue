<script setup>
import { ref, onMounted } from "vue";
import { getRutas } from "../services/rutasService";
import FormRuta from "../components/FormRuta.vue";

const rutas = ref([]);
const loading = ref(true);
const error = ref(null);
const mostrarFormulario = ref(false);

async function cargarRutas() {
  try {
    const data = await getRutas();
    rutas.value = data;
  } catch (err) {
    error.value = "No se pudo cargar la lista de rutas.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  cargarRutas();
});

function onRutaCreada() {
  mostrarFormulario.value = false;
  cargarRutas(); 
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">📍 Rutas registradas</h1>

    <button
      @click="mostrarFormulario = !mostrarFormulario"
      class="bg-green-600 text-white px-4 py-2 rounded mb-4"
    >
      {{ mostrarFormulario ? "Cerrar" : "Nueva Ruta" }}
    </button>

    <FormRuta v-if="mostrarFormulario" @rutaCreada="onRutaCreada" />

    <div v-if="loading">Cargando rutas...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <table v-else class="w-full border">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="p-2">ID</th>
          <th class="p-2">Origen</th>
          <th class="p-2">Destino</th>
          <th class="p-2">Vehículo</th>
          <th class="p-2">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ruta in rutas" :key="ruta.id" class="border-t">
          <td class="p-2">{{ ruta.id }}</td>
          <td class="p-2">{{ ruta.origen }}</td>
          <td class="p-2">{{ ruta.destino }}</td>
          <td class="p-2">{{ ruta.vehiculo?.placa || 'No asignado' }}</td>
          <td class="p-2">{{ ruta.fecha || 'N/A' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
