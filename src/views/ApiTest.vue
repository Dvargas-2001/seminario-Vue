<template>
  <div class="api-container">
    <div class="contenido">
      <div class="panel-izquierdo">
        <h1 class="titulo">🌐 Conexión con la API</h1>
        <p class="descripcion">
          Verifica la comunicación con el servicio y consulta los vehículos registrados.
        </p>

        <div class="botones">
          <button @click="probarConexion" class="btn probar">Probar Conexión</button>
          <button @click="listarVehiculos" class="btn listar">Listar Vehículos</button>
        </div>

        <p v-if="mensaje" :class="estadoClase">{{ mensaje }}</p>

        <div v-if="vehiculos.length" class="lista">
          <h3>🚗 Vehículos registrados:</h3>
          <ul>
            <li v-for="v in vehiculos" :key="v.id">
              <img src="@/assets/placa.png" class="icono" alt="icono placa" />
              <strong>{{ v.placa }}</strong> — {{ v.modelo || 'Sin modelo' }}
            </li>
          </ul>
        </div>

        <p v-else-if="!cargando && probada && !vehiculos.length" class="sin-datos">
          No hay vehículos registrados o no se pudo obtener la lista.
        </p>
      </div>

      <div class="panel-derecho">
        <img src="@/assets/api.jpeg" alt="API Imagen" class="imagen-api" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/services/api' // 🔗 conexión real

const mensaje = ref('')
const estadoClase = ref('')
const vehiculos = ref([])
const probada = ref(false)
const cargando = ref(false)

const probarConexion = async () => {
  mensaje.value = '⏳ Probando conexión con la API...'
  estadoClase.value = ''
  cargando.value = true
  probada.value = true

  try {
    const res = await api.get('/vehiculos') // ✅ intento real a la API
    console.log("📦 Respuesta de API:", res.data)
    if (res?.data) {
      mensaje.value = '✅ Conexión exitosa con la API del profesor.'
      estadoClase.value = 'exito'
    } else {
      throw new Error('Sin respuesta válida de la API.')
    }
  } catch (error) {
    console.warn('⚠️ No se pudo conectar con la API:', error.message)
    mensaje.value = '⚠️ Conexión fallida, usando datos locales simulados.'
    estadoClase.value = 'error'
  } finally {
    cargando.value = false
  }
}

const listarVehiculos = async () => {
  mensaje.value = '⏳ Obteniendo lista de vehículos...'
  estadoClase.value = ''
  vehiculos.value = []
  cargando.value = true
  probada.value = true

  try {
    // 🔍 Intentar obtener desde la API
    const res = await api.get('/vehiculos')
    console.log("📦 Datos recibidos:", res.data)
    if (res?.data?.data?.length) {
      vehiculos.value = res.data.data
      mensaje.value = `✅ Se encontraron ${vehiculos.value.length} vehículo(s).`
      estadoClase.value = 'exito'
    } else {
      throw new Error('Respuesta vacía o no válida')
    }
  } catch (error) {
    console.warn('⚠️ Error al consultar API, usando LocalStorage...')
    try {
      // 🧠 Fallback a datos locales
      const data = JSON.parse(localStorage.getItem('vehiculos')) || []
      if (data.length) {
        vehiculos.value = data
        mensaje.value = `⚠️ Mostrando ${data.length} vehículo(s) locales.`
        estadoClase.value = 'error'
      } else {
        mensaje.value = '❌ No se encontraron vehículos en la API ni en local.'
        estadoClase.value = 'error'
      }
    } catch (err2) {
      mensaje.value = '❌ Error al leer datos locales.'
      estadoClase.value = 'error'
    }
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
