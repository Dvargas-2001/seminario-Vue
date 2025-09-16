<template>
  <div>
    <h1>Página de Inicio</h1>
    <input v-model="message" placeholder="Escribe algo" />
    <p>Mensaje: {{ message }}</p>

    <!-- Aquí usamos el nuevo componente -->
    <ProductList />
  </div>
</template>

<script>
import ProductList from "../components/ProductList.vue";

export default {
  name: "Home",
  components: { ProductList },
  data() {
    return {
      message: "",
    };
  },
};
</script>
