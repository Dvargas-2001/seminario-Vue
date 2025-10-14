<template>
  <div class="api-container">
    <div class="contenido">
      <!-- Columna izquierda -->
      <div class="panel-izquierdo">
        <h1 class="titulo">🌐 Conexión con la API</h1>
        <p class="descripcion">
          Verifica la comunicación y consulta los vehículos registrados.
        </p>

        <div class="botones">
          <button @click="probarConexion" class="btn probar">Probar Conexión</button>
          <button @click="listarVehiculos" class="btn listar">Listar Vehículos</button>
        </div>

        <p v-if="estado" :class="estadoClase">{{ mensaje }}</p>

        <!-- Lista de vehículos -->
        <div v-if="vehiculos.length" class="lista">
          <h3>🚗 Vehículos registrados:</h3>
          <ul>
            <li v-for="v in vehiculos" :key="v.id">
              <img src="@/assets/placa.png" class="icono" alt="icono placa" />
              <strong>{{ v.placa }}</strong> — {{ v.modelo || 'Sin modelo' }}
            </li>
          </ul>
        </div>

        <p
          v-else-if="!cargando && probada && !vehiculos.length"
          class="sin-datos"
        >
          No hay vehículos registrados o no se pudo obtener la lista.
        </p>
      </div>

      <!-- Columna derecha -->
      <div class="panel-derecho">
        <img src="@/assets/api.jpeg" alt="API Imagen" class="imagen-api" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const mensaje = ref('')
const estadoClase = ref('')
const vehiculos = ref([])
const probada = ref(false)
const cargando = ref(false)

// Probar conexión a la API
const probarConexion = async () => {
  try {
    mensaje.value = '⏳ Probando conexión...'
    estadoClase.value = ''
    probada.value = true
    cargando.value = true

    const response = await axios.get('http://apirecoleccion.gonzaloandreslucio.com/api/calles')
    if (response.status === 200) {
      mensaje.value = '✅ Conexión exitosa con la API'
      estadoClase.value = 'exito'
    } else {
      mensaje.value = '⚠️ La API respondió, pero con error.'
      estadoClase.value = 'error'
    }
  } catch (error) {
    mensaje.value = '❌ Error: No se pudo conectar con la API.'
    estadoClase.value = 'error'
  } finally {
    cargando.value = false
  }
}

// Listar vehículos (requiere autenticación o endpoint correcto)
const listarVehiculos = async () => {
  try {
    mensaje.value = '⏳ Obteniendo lista de vehículos...'
    estadoClase.value = ''
    vehiculos.value = []
    cargando.value = true
    probada.value = true

    const response = await axios.get('http://apirecoleccion.gonzaloandreslucio.com/api/vehiculos')
    vehiculos.value = response.data || []
    mensaje.value = `✅ Se obtuvieron ${vehiculos.value.length} vehículos`
    estadoClase.value = 'exito'
  } catch (error) {
    mensaje.value =
      '⚠️ No se pudo obtener la lista de vehículos. Puede requerir perfil o autenticación.'
    estadoClase.value = 'error'
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.api-container {
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

.panel-izquierdo {
  flex: 1;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.panel-derecho {
  flex: 1;
  display: flex;
  justify-content: center;
}

.imagen-api {
  width: 90%;
  max-width: 500px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.titulo {
  color: #1e3a8a;
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 10px;
}

.descripcion {
  color: #374151;
  font-size: 16px;
  margin-bottom: 30px;
}

.botones {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn.probar {
  background-color: #2563eb;
  color: white;
}

.btn.listar {
  background-color: #059669;
  color: white;
}

.btn:hover {
  transform: scale(1.03);
  opacity: 0.9;
}

.exito {
  color: #16a34a;
  font-weight: 600;
}

.error {
  color: #dc2626;
  font-weight: 600;
}

.lista {
  margin-top: 20px;
  text-align: left;
}

.lista ul {
  list-style: none;
  padding: 0;
}

.lista li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
}

.icono {
  width: 20px;
  height: 20px;
  opacity: 0.8;
}

.sin-datos {
  color: #6b7280;
  margin-top: 10px;
}
</style>
