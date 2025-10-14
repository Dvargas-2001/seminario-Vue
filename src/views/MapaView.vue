<template>
  <div class="mapa-container">
    <h2 class="titulo">Mapa de Rutas - Buenaventura</h2>
    <div id="map" class="mapa"></div>

    <!-- Botón de actualización -->
    <div class="acciones">
      <button @click="cargarRutas" class="boton-recargar">🔄 Actualizar Rutas</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const map = ref(null)
let rutasLayer = null

// Función para inicializar el mapa
const inicializarMapa = () => {
  map.value = L.map('map').setView([3.8777, -77.0317], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  }).addTo(map.value)
}

// Función para cargar las rutas desde la API
const cargarRutas = async () => {
  try {
    if (!map.value) return

    // Elimina rutas anteriores
    if (rutasLayer) {
      map.value.removeLayer(rutasLayer)
    }

    // Petición a la API (ajusta el endpoint según el backend del profesor)
    const response = await axios.get('http://apirecoleccion.gonzaloandreslucio.com/api/rutas')
    const rutas = response.data

    // Capa para agrupar rutas
    rutasLayer = L.layerGroup().addTo(map.value)

    rutas.forEach((ruta) => {
      // Cada ruta puede tener coordenadas en formato [[lat1, lng1], [lat2, lng2], ...]
      if (ruta.coordenadas && ruta.coordenadas.length > 1) {
        const polyline = L.polyline(ruta.coordenadas, {
          color: 'blue',
          weight: 4,
        }).addTo(rutasLayer)

        L.marker(ruta.coordenadas[0]).addTo(rutasLayer).bindPopup(`Inicio: ${ruta.nombre}`)
        L.marker(ruta.coordenadas[ruta.coordenadas.length - 1])
          .addTo(rutasLayer)
          .bindPopup(`Fin: ${ruta.nombre}`)

        map.value.fitBounds(polyline.getBounds())
      }
    })
  } catch (error) {
    console.error('Error cargando rutas:', error)
    alert('❌ No se pudieron cargar las rutas desde la API.')
  }
}

// Inicializar al montar el componente
onMounted(() => {
  inicializarMapa()
  cargarRutas()
})
</script>

<style scoped>
.mapa-container {
  padding: 20px;
}

.titulo {
  text-align: center;
  color: #1e3a8a;
  font
