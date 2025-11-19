<template>
  <div class="mapa-contenedor">
    <h2 class="titulo">🗺️ Mapa de Vehículos Registrados</h2>
    <p class="descripcion">Visualiza los vehículos registrados en el sistema sobre el mapa.</p>

    <div id="map" class="mapa"></div>

    <div v-if="vehiculos.length === 0" class="sin-datos">
      ⚠️ No hay vehículos registrados para mostrar.
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const vehiculos = ref([]);

onMounted(() => {
  const data = JSON.parse(localStorage.getItem("vehiculos")) || [];
  vehiculos.value = data;

  const mapa = L.map("map").setView([3.8773, -77.0260], 13);

  // Cargar el mapa base de OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(mapa);

  // Icono personalizado para los vehículos
  const iconoVehiculo = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
  });

  // Agregar marcadores para cada vehículo
  if (vehiculos.value.length > 0) {
    vehiculos.value.forEach((v, i) => {
      // Asigna una ubicación simulada cerca del centro (para visualización)
      const lat = 3.8773 + (Math.random() - 0.5) * 0.01;
      const lon = -77.0260 + (Math.random() - 0.5) * 0.01;

      L.marker([lat, lon], { icon: iconoVehiculo })
        .addTo(mapa)
        .bindPopup(`
          <strong>🚗 ${v.placa}</strong><br>
          Modelo: ${v.modelo}<br>
          Propietario: ${v.propietario}<br>
          Estado: ${v.estado}
        `);
    });
  }
});
</script>

<style scoped>
.mapa-contenedor {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.titulo {
  text-align: center;
  color: #1e3a8a;
  font-size: 26px;
  font-weight: 700;
}

.descripcion {
  text-align: center;
  color: #374151;
  margin-bottom: 20px;
}

.mapa {
  height: 500px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.sin-datos {
  text-align: center;
  margin-top: 10px;
  color: #6b7280;
}
</style>
