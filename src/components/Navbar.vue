<template>
  <nav>
    <a href="#">Inicio</a>
    <a href="#">Productos</a>
    <a href="#">Acerca</a>
    <a href="#">Contacto</a>

    <div class="cart">
      🛒 <span>{{ cartCount }}</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    cartCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #2c3e50;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

nav a {
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

nav a:hover {
  color: #f39c12;
}

.cart {
  color: white;
  font-size: 1.2rem;
}
.cart span {
  background: #f39c12;
  padding: 0.2rem 0.6rem;
  border-radius: 50%;
  font-weight: bold;
  margin-left: 0.3rem;
}
</style>
