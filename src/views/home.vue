<template>
  <div class="inicio">
    <div class="contenido">
      <div class="texto">
        <h1 class="titulo">Sistema de Control Vehicular</h1>
        <p class="descripcion">
          Control, seguridad y rendimiento para una movilidad eficiente.
        </p>

        <!-- Botones principales -->
<div class="botones">
  <router-link to="/registro-vehiculo" class="boton registrar">
    Registrar Vehículo
  </router-link>

  <router-link to="/registro-ruta" class="boton registrar">
    Registrar Ruta
  </router-link>

  <router-link to="/api-test" class="boton registrar">
    Ver Lista de Vehículos
  </router-link>

  <button @click="probarConexion" class="boton conexion">
    Probar Conexión API
  </button>
</div>

        <p v-if="mensaje" :class="estadoClase" class="mensaje-api">{{ mensaje }}</p>
      </div>

      <div class="imagen">
        <img src="@/assets/api.jpeg" alt="API Imagen" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const mensaje = ref('')
const estadoClase = ref('')

const probarConexion = async () => {
  try {
    mensaje.value = 'Probando conexión...'
    estadoClase.value = 'pendiente'

    const response = await axios.get('http://apirecoleccion.gonzaloandreslucio.com/api')
    if (response.status === 200) {
      mensaje.value = 'Conexión exitosa con la API'
      estadoClase.value = 'exito'
    } else {
      mensaje.value = 'La API respondió, pero con un error'
      estadoClase.value = 'error'
    }
  } catch (error) {
    mensaje.value = 'Error: No se pudo conectar con la API'
    estadoClase.value = 'error'
  }
}
</script>

<style scoped>
.inicio {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #f8fafc 0%, #e0f7fa 100%);
  padding: 50px 20px;
}

.contenido {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  max-width: 1100px;
  width: 100%;
}

.texto {
  flex: 1;
}

.imagen {
  flex: 1;
  display: flex;
  justify-content: center;
}

.imagen img {
  width: 90%;
  max-width: 450px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.titulo {
  color: #1e3a8a;
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 10px;
}

.descripcion {
  color: #374151;
  font-size: 18px;
  margin-bottom: 30px;
}

.botones {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.boton {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
}

.boton.registrar {
  background-color: #059669;
}

.boton.conexion {
  background-color: #2563eb;
}

.boton:hover {
  transform: scale(1.03);
  opacity: 0.9;
}

.mensaje-api {
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
}

.exito {
  color: #16a34a;
}

.error {
  color: #dc2626;
}

.pendiente {
  color: #f59e0b;
}
</style>
