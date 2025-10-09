<template>
  <div class="registro-container">
    <div class="form-card">
      <h1 class="titulo">🚗 Registro de Nuevo Vehículo</h1>
      <p class="descripcion">Agrega los datos del vehículo para su control y seguimiento.</p>

      <form @submit.prevent="registrarVehiculo" class="formulario">
        <!-- CAMPO PLACA -->
        <div class="campo">
          <img src="@/assets/placa.png" alt="Ícono Placa" class="icono" />
          <input
            type="text"
            v-model="placa"
            placeholder="Ingrese la placa del vehículo"
            required
          />
        </div>

        <!-- CAMPO CAPACIDAD -->
        <div class="campo">
          <img src="@/assets/capacidad.png" alt="Ícono Capacidad" class="icono" />
          <input
            type="number"
            v-model="capacidad"
            placeholder="Capacidad del vehículo (kg o pasajeros)"
            required
          />
        </div>

        <!-- CAMPO TIPO -->
        <div class="campo">
          <img src="@/assets/tipodevehiculo.png" alt="Ícono Tipo" class="icono" />
          <input
            type="text"
            v-model="tipo"
            placeholder="Tipo de vehículo (ej. Camión, Moto, Auto)"
            required
          />
        </div>

        <!-- BOTÓN REGISTRAR -->
        <button type="submit" class="boton-registrar">
          Registrar Vehículo
        </button>

        <!-- MENSAJE DE ESTADO -->
        <p v-if="mensaje" :class="estado">{{ mensaje }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const placa = ref('')
const capacidad = ref('')
const tipo = ref('')
const mensaje = ref('')
const estado = ref('')

const registrarVehiculo = async () => {
  try {
    const nuevoVehiculo = { placa: placa.value, capacidad: capacidad.value, tipo: tipo.value }

    // Intenta enviar a la API
    await axios.post('http://apirecoleccion.gonzaloandreslucio.com/api/vehiculos', nuevoVehiculo)

    mensaje.value = '✅ Vehículo registrado correctamente'
    estado.value = 'exito'
    placa.value = capacidad.value = tipo.value = ''
  } catch (error) {
    mensaje.value = '⚠️ No se pudo conectar a la API. Guardado localmente.'
    estado.value = 'error'
    console.error(error)
  }
}
</script>

<style scoped>
.registro-container {
  min-height: 100vh;
  background: linear-gradient(120deg, #f8fafc 0%, #e6fff7 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 120px;
}

.form-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.titulo {
  color: #1e3a8a;
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 10px;
}

.descripcion {
  color: #4b5563;
  margin-bottom: 30px;
  font-size: 15px;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Campos */
.campo {
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 12px 15px;
  transition: all 0.3s ease; /* 🔹 duración + suavizado */
}

.campo:hover {
  background: #e0f2fe;
}

.icono {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  opacity: 0.8;
}

input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: #111827;
}

/* Botón */
.boton-registrar {
  background-color: #059669;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.boton-registrar:hover {
  background-color: #047857;
  transform: scale(1.03);
}

/* Mensajes */
.exito {
  color: #16a34a;
  margin-top: 15px;
  font-weight: 600;
}

.error {
  color: #dc2626;
  margin-top: 15px;
  font-weight: 600;
}
</style>
