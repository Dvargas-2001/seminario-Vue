<template>
  <div>
    <h2>Lista de productos</h2>
    <div class="grid">
      <ProductCard 
  v-for="item in products" 
  :key="item.id" 
  :name="item.name" 
  :price="item.price"
  :image="item.image"
  @add-to-cart="$emit('add-to-cart', item)"
/>

    </div>
  </div>
</template>

<script>
import { products } from "../data/products.js";
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductList",
  components: { ProductCard },
  data() {
    return {
      products,
    };
  },
  methods: {
    handleAddToCart(product) {
      console.log("Producto agregado:", product);
      // Aquí luego conectaremos con el carrito en NavBar.vue
    }
  }
};
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
