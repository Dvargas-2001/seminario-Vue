<template>
  <div>
    <h2>Lista de Calles</h2>
    <ul>
      <li v-for="calle in calles" :key="calle.id">
        {{ calle.nombre }}
        <!-- Botones de ejemplo -->
        <button @click="verDetalle(calle)">Ver</button>
        <button @click="editarCalle(calle)">Editar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const calles = ref([]);

    const obtenerCalles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/calles");
        calles.value = response.data;
        console.log("Datos de calles:", calles.value);
      } catch (error) {
        console.error("Error al obtener calles:", error);
      }
    };

    const verDetalle = (calle) => {
      alert(`Detalle de la calle: ${calle.nombre}`);
    };

    const editarCalle = (calle) => {
      alert(`Editar calle: ${calle.nombre}`);
    };

    onMounted(() => {
      obtenerCalles();
    });

    return { calles, verDetalle, editarCalle };
  },
};
</script>
