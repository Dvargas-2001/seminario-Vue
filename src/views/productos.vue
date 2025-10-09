<template>
  <div>
    <h1>Listado de Productos</h1>
    <ProductList @add-to-cart="$emit('add-to-cart', $event)" />
  </div>
</template>

<script>
import ProductList from "../components/ProductList.vue";

export default {
  name: "Productos",
  components: { ProductList }
};
</script>
