<template>
  <main class="home">
    <h1>Inicio</h1>

    <button @click="probarConexion" :disabled="cargando">
      {{ cargando ? "Probando..." : "Probar conexión con la API" }}
    </button>

    <p v-if="mensaje" :class="estadoClase">{{ mensaje }}</p>

    <ul v-if="perfiles.length">
      <li v-for="p in perfiles" :key="p.id || p.nombre">
        {{ p.nombre || p.descripcion || JSON.stringify(p) }}
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { getPerfiles } from "@/services/perfiles";

const mensaje = ref("");
const estadoClase = ref("");
const cargando = ref(false);
const perfiles = ref([]);

const probarConexion = async () => {
  mensaje.value = "Probando conexión con /perfiles...";
  estadoClase.value = "pendiente";
  cargando.value = true;
  perfiles.value = [];

  try {
    const data = await getPerfiles();
    perfiles.value = Array.isArray(data) ? data : [];
    mensaje.value = `Petición realizada. Perfiles recibidos: ${perfiles.value.length}`;
    estadoClase.value = perfiles.value.length ? "exito" : "pendiente";
  } catch (error) {
    console.error(error);
    mensaje.value = "Error: no se pudo obtener la lista de perfiles.";
    estadoClase.value = "error";
  } finally {
    cargando.value = false;
  }
};
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 2rem auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background: #2ecc71;
  color: white;
}
button[disabled] {
  opacity: 0.6;
  cursor: default;
}
p.exito {
  color: #27ae60;
}
p.error {
  color: #c0392b;
}
p.pendiente {
  color: #f39c12;
}
</style>
