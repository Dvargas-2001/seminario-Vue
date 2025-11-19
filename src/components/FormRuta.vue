<script setup>
import { ref } from "vue";
import { createRuta } from "../services/rutasService";
import { getVehiculos } from "../services/vehiculosService";

const emit = defineEmits(["rutaCreada"]);
const nuevaRuta = ref({
  origen: "",
  destino: "",
  fecha: "",
  vehiculo_id: null,
});
const vehiculos = ref([]);
const mensaje = ref("");
const cargando = ref(false);

async function cargarVehiculos() {
  try {
    vehiculos.value = await getVehiculos();
  } catch {
    mensaje.value = "No se pudieron cargar los vehículos.";
  }
}

cargarVehiculos();

async function guardarRuta() {
  cargando.value = true;
  mensaje.value = "";

  try {
    await createRuta(nuevaRuta.value);
    mensaje.value = "Ruta creada correctamente.";
    emit("rutaCreada");
    nuevaRuta.value = { origen: "", destino: "", fecha: "", vehiculo_id: null };
  } catch (error) {
    mensaje.value = "Error al crear la ruta.";
  } finally {
    cargando.value = false;
  }
}
</script>

<template>
  <div class="border p-4 rounded mb-4 bg-gray-50">
    <h2 class="text-lg font-semibold mb-2">Registrar nueva ruta</h2>

    <div class="grid gap-2 mb-3">
      <input v-model="nuevaRuta.origen" placeholder="Origen" class="border p-2 rounded" />
      <input v-model="nuevaRuta.destino" placeholder="Destino" class="border p-2 rounded" />
      <input v-model="nuevaRuta.fecha" type="date" class="border p-2 rounded" />

      <select v-model="nuevaRuta.vehiculo_id" class="border p-2 rounded">
        <option disabled value="">Seleccione un vehículo</option>
        <option v-for="v in vehiculos" :key="v.id" :value="v.id">
          {{ v.placa }} — {{ v.marca }}
        </option>
      </select>
    </div>

    <button
      @click="guardarRuta"
      :disabled="cargando"
      class="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {{ cargando ? "Guardando..." : "Guardar Ruta" }}
    </button>

    <p v-if="mensaje" class="mt-2">{{ mensaje }}</p>
  </div>
</template>
