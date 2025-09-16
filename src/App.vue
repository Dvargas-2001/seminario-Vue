<template>
  <div>
    <NavBar :cartCount="cartCount" />
    <h1>Bienvenido a mi tienda</h1>
    <ProductList @add-to-cart="increaseCart" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import ProductList from "./components/ProductList.vue";

export default {
  name: "App",
  components: { NavBar, ProductList },
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
