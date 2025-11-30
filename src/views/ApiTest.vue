<template>
  <div class="api-container">
    <div class="contenido">
      <div class="panel-izquierdo">
        <h1 class="titulo"> Prueba de Conexión con la API</h1>
        <p class="descripcion">
          Verifica la comunicación con el servicio y consulta los vehículos registrados.
        </p>

        <div class="botones">
          <button @click="probarConexion" class="btn probar">
            Probar Conexión
          </button>
          <button @click="listarVehiculos" class="btn listar">
            Listar Vehículos
          </button>
        </div>

        <p v-if="mensaje" :class="estadoClase">{{ mensaje }}</p>

        <div v-if="vehiculos.length" class="lista">
          <h3> Vehículos registrados:</h3>
          <ul>
            <li v-for="v in vehiculos" :key="v.id">
              <img src="@/assets/placa.png" class="icono" alt="icono placa" />
              <strong>{{ v.placa }}</strong> — {{ v.modelo || 'Sin modelo' }}
            </li>
          </ul>
        </div>

        <p v-else-if="probada && !vehiculos.length" class="sin-datos">
          No se encontraron vehículos.
        </p>
      </div>

      <div class="panel-derecho">
        <img src="@/assets/api.jpeg" alt="API Imagen" class="imagen-api" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/services/api";

const mensaje = ref("");
const detalle = ref("");
const cargando = ref(false);

const probarConexion = async () => {
  mensaje.value = "Probando conexión...";
  detalle.value = "";
  cargando.value = true;

  try {
    // 👉 llamamos a un endpoint real, por ejemplo /vehiculos
    const res = await api.get("/vehiculos");

    mensaje.value = `Conexión exitosa. Status ${res.status}`;
    detalle.value = JSON.stringify(res.data, null, 2);
  } catch (error) {
    // 👉 Aquí distinguimos los casos
    if (error.response) {
      // El servidor respondió pero con error (401, 403, 404, 500...)
      mensaje.value = `Error de API: status ${error.response.status}`;
      detalle.value = JSON.stringify(error.response.data, null, 2);
    } else if (error.request) {
      // La petición salió, pero no hubo respuesta (CORS, servidor caído, etc.)
      mensaje.value = "No se recibió respuesta de la API (posible CORS/HTTPS).";
      detalle.value = error.message;
    } else {
      // Error al armar la petición
      mensaje.value = "Error al crear la petición a la API.";
      detalle.value = error.message;
    }

    console.error("Error en probarConexion:", error);
  } finally {
    cargando.value = false;
  }
};
</script>

<style scoped>
.api-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #f8fafc, #e0f7fa);
  padding: 40px;
}

.contenido {
  display: flex;
  gap: 40px;
  max-width: 1100px;
}

.panel-izquierdo {
  flex: 1;
  background: white;
  padding: 35px;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.panel-derecho {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imagen-api {
  width: 95%;
  max-width: 480px;
  border-radius: 18px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

.titulo {
  color: #1e3a8a;
  font-size: 28px;
  font-weight: 800;
}

.descripcion {
  color: #374151;
  margin-bottom: 20px;
}

.botones {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  transition: 0.3s ease;
}

.btn.probar {
  background: #2563eb;
  color: white;
}

.btn.listar {
  background: #059669;
  color: white;
}

.btn:hover {
  transform: scale(1.03);
}

.exito {
  color: #16a34a;
  font-weight: 600;
}

.error {
  color: #dc2626;
  font-weight: 600;
}

.lista ul {
  list-style: none;
  margin-top: 10px;
}

.lista li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
}

.icono {
  width: 22px;
}
</style>
