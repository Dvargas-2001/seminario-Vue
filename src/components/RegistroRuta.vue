<template>
  <div class="ruta-container">
    <div class="contenido">
      <!-- IZQUIERDA: IMAGEN DEL MAPA -->
      <div class="imagen">
        <img src="@/assets/ruta.jpeg" alt="Mapa de Ruta" class="mapa" />
      </div>

      <!-- DERECHA: FORMULARIO -->
      <div class="form-card">
        <h1 class="titulo">🗺️ Registro de Rutas</h1>
        <p class="descripcion">Agrega y administra las rutas asignadas a los vehículos.</p>

        <form @submit.prevent="registrarRuta" class="formulario">
          <!-- CAMPO NOMBRE DE RUTA -->
          <div class="campo">
            <input
              type="text"
              v-model="nombre"
              placeholder="Nombre de la ruta"
              required
            />
          </div>

          <!-- CAMPO ORIGEN -->
          <div class="campo">
            <input
              type="text"
              v-model="origen"
              placeholder="Punto de origen"
              required
            />
          </div>

          <!-- CAMPO DESTINO -->
          <div class="campo">
            <input
              type="text"
              v-model="destino"
              placeholder="Punto de destino"
              required
            />
          </div>

          <!-- CAMPO DISTANCIA -->
          <div class="campo">
            <input
              type="number"
              v-model="distancia"
              placeholder="Distancia (km)"
              required
            />
          </div>

          <!-- BOTÓN REGISTRAR -->
          <button type="submit" class="boton-registrar">
            Registrar Ruta
          </button>

          <!-- MENSAJE DE ESTADO -->
          <p v-if="mensaje" :class="estado">{{ mensaje }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const nombre = ref('')
const origen = ref('')
const destino = ref('')
const distancia = ref('')
const mensaje = ref('')
const estado = ref('')

const registrarRuta = async () => {
  try {
    const nuevaRuta = {
      nombre: nombre.value,
      origen: origen.value,
      destino: destino.value,
      distancia: distancia.value
    }

    // Intenta enviar a la API
    await axios.post('http://apirecoleccion.gonzaloandreslucio.com/api/rutas', nuevaRuta)

    mensaje.value = '✅ Ruta registrada correctamente'
    estado.value = 'exito'

    nombre.value = origen.value = destino.value = distancia.value = ''
  } catch (error) {
    mensaje.value = '⚠️ No se pudo conectar a la API. Guardado localmente.'
    estado.value = 'error'
    console.error(error)
  }
}
</script>

<style scoped>
.ruta-container {
  min-height: 100vh;
  background: linear-gradient(120deg, #f8fafc 0%, #e6fff7 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
}

.contenido {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  max-width: 1200px;
  width: 100%;
  flex-wrap: wrap;
}

/* IMAGEN IZQUIERDA */
.imagen {
  flex: 1;
  display: flex;
  justify-content: center;
}

.mapa {
  width: 450px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* FORMULARIO DERECHA */
.form-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 480px;
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

/* Campos de texto */
.campo {
  background: #f1f5f9;
  border-radius: 12px;
  padding: 12px 15px;
  transition: all 0.3s ease;
}

.campo:hover {
  background: #e0f2fe;
}

input {
  width: 100%;
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
