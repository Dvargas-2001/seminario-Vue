<template>
  <div>
    <!-- Menú de navegación -->
    <NavBar :cartCount="cartCount" />

    <!-- Aquí se mostrarán las vistas -->
    <router-view @add-to-cart="increaseCart" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
  data() {
    return {
      cartCount: 0
    };
  },
  methods: {
    increaseCart(product) {
      this.cartCount++;
      console.log("Producto agregado al carrito:", product);
    }
  }
};
</script>
