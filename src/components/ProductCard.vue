<template>
  <div class="card">
    <img :src="image" :alt="`Imagen de ${name}`" />
    <h3>{{ name }}</h3>
    <p>Precio: ${{ price.toFixed(2) }}</p>
    <button 
      @click="$emit('add-to-cart', { id, name, price, image })"
      :aria-label="`Agregar ${name} al carrito`"
    >
      🛒 Agregar al carrito
    </button>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      validator: value => value >= 0
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/150"
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 220px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

button {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #f39c12;
}
</style>
