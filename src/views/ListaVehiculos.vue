<template>
  <div class="lista-container">
    <h1 class="titulo">Lista de Vehículos</h1>

    <!-- Botón para cargar datos -->
    <button class="boton" @click="obtenerVehiculos">
      🔄 Cargar Vehículos
    </button>

    <!-- Estado de carga -->
    <p v-if="cargando">Cargando vehículos...</p>

    <!-- Mensaje si no hay datos -->
    <p v-if="!cargando && vehiculos.length === 0">No se encontraron vehículos.</p>

    <!-- Tabla de vehículos -->
    <table v-if="vehiculos.length > 0" class="tabla">
      <thead>
        <tr>
          <th>ID</th>
          <th>Placa</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Propietario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehiculo in vehiculos" :key="vehiculo.id">
          <td>{{ vehiculo.id }}</td>
          <td>{{ vehiculo.placa }}</td>
          <td>{{ vehiculo.marca }}</td>
          <td>{{ vehiculo.modelo }}</td>
          <td>{{ vehiculo.propietario || 'No registrado' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const vehiculos = ref([])
const cargando = ref(false)

const obtenerVehiculos = async () => {
  cargando.value = true
  vehiculos.value = []

  try {
    // 🔹 Endpoint del profe (ajustable según autenticación)
    const respuesta = await axios.get('/api/vehiculos')

    // Si responde correctamente
    vehiculos.value = respuesta.data
  } catch (error) {
    console.error('Error al obtener vehículos:', error)

    // 🔹 Datos de prueba si la API falla
    vehiculos.value = [
      { id: 1, placa: 'ABC-123', marca: 'Toyota', modelo: 'Corolla', propietario: 'Carlos Pérez' },
      { id: 2, placa: 'XYZ-987', marca: 'Chevrolet', modelo: 'Spark', propietario: 'Ana Gómez' },
      { id: 3, placa: 'LMN-456', marca: 'Kia', modelo: 'Rio', propietario: 'Luis Martínez' }
    ]
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.lista-container {
  padding: 2rem;
  text-align: center;
}

.titulo {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.boton {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}
.boton:hover {
  background-color: #1a252f;
}

.tabla {
  width: 90%;
  margin: 2rem auto;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
th, td {
  border: 1px solid #ddd;
  padding: 0.8rem;
}
th {
  background-color: #2c3e50;
  color: white;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
