<template>
  <div style="padding: 20px;">
    <h2>🚛 Prueba de conexión simulada - Vehículos</h2>

    <button
      @click="listarVehiculos"
      style="margin: 10px 0; padding: 8px 12px; background-color:#1e3a8a; color:white; border:none; border-radius:5px;"
    >
      Listar Vehículos
    </button>

    <p v-if="error" style="color: red; margin-top: 10px;">⚠️ Error: {{ error }}</p>

    <div v-if="vehiculos && vehiculos.length" style="margin-top: 20px;">
      <h3>📋 Vehículos encontrados (simulados):</h3>
      <ul>
        <li v-for="v in vehiculos" :key="v.id">
          🚗 <strong>{{ v.placa }}</strong> — {{ v.modelo }} ({{ v.tipo }})
        </li>
      </ul>
    </div>

    <p v-else-if="vehiculos && vehiculos.length === 0" style="margin-top: 20px;">
      No hay vehículos registrados.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Simulación local
const vehiculos = ref(null)
const error = ref(null)

const listarVehiculos = async () => {
  try {
    error.value = null
    console.log('Cargando datos simulados...')

    // Espera breve para simular carga
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Datos simulados (como si vinieran de la API)
    vehiculos.value = [
      { id: 1, placa: 'ABC123', modelo: 'Camión Recolector', tipo: 'Pesado' },
      { id: 2, placa: 'XYZ987', modelo: 'Compactador', tipo: 'Mediano' },
      { id: 3, placa: 'LMN456', modelo: 'Volqueta', tipo: 'Pesado' }
    ]

    console.log('Vehículos simulados cargados.')
  } catch (err) {
    console.error('Error en simulación:', err)
    error.value = err.message
  }
}
</script>
