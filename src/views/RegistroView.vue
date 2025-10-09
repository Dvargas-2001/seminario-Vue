<template>
  <div class="registro-vehiculo-container">
    <h2>Registro de Nuevo Vehículo</h2>
    
    <!-- Mensajes de respuesta de la API (Éxito o Error) -->
    <p v-if="mensajeExito" class="mensaje-exito">{{ mensajeExito }}</p>
    <p v-if="mensajeError" class="mensaje-error">{{ mensajeError }}</p>

    <!-- El formulario llama a la función registrarVehiculo() al enviarse -->
    <form @submit.prevent="registrarVehiculo">
      
      <!-- Campo Placa -->
      <div class="form-group">
        <label for="placa">Placa del Vehículo:</label>
        <input 
          id="placa" 
          type="text" 
          v-model="vehiculo.placa" 
          required
        >
      </div>

      <!-- Campo Capacidad -->
      <div class="form-group">
        <label for="capacidad">Capacidad (kg):</label>
        <input 
          id="capacidad" 
          type="number" 
          v-model.number="vehiculo.capacidad" 
          required
        >
      </div>

      <!-- Campo Tipo (select) -->
      <div class="form-group">
        <label for="tipo">Tipo de Vehículo:</label>
        <select id="tipo" v-model="vehiculo.tipo" required>
            <option value="" disabled>Seleccione el tipo</option>
            <option value="Camión">Camión</option>
            <option value="Volqueta">Volqueta</option>
        </select>
      </div>

      <button type="submit">Registrar Vehículo</button>
    </form>
  </div>
</template>

<script>
// ¡IMPORTANTE! Se usa 'fetch' nativo en lugar de Axios para evitar errores de importación

// **¡DEBES REEMPLAZAR ESTOS VALORES!**
const API_URL = 'http://[REEMPLAZAR_CON_TU_URL_DE_REGISTRO_DE_VEHICULOS]/api/vehiculos'; 
const TU_TOKEN_DE_GRUPO = '1de4d974-3a97-4e8a-8b21-fbb880e23896'; 

const RegistroVehiculo = { // Definimos el objeto del componente primero
  name: 'RegistroVehiculo',
  data() {
    return {
      vehiculo: {
        placa: '',
        capacidad: 0, 
        tipo: '',     
      },
      mensajeError: null,
      mensajeExito: null,
    };
  },
  methods: {
    async registrarVehiculo() {
      this.mensajeError = null;
      this.mensajeExito = null;
      
      // 1. Configuramos los encabezados (headers) con el Token
      const headers = {
        'Authorization': `Bearer ${TU_TOKEN_DE_GRUPO}`, 
        'Content-Type': 'application/json',
      };
      
      try {
        // 2. Usamos 'fetch' nativo para evitar el error de importación
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: headers,
          // Convertimos el objeto de Vue a una cadena JSON
          body: JSON.stringify(this.vehiculo) 
        });

        // 3. Procesamos la respuesta JSON
        const data = await response.json();

        if (!response.ok) {
          // Si el estado HTTP no es 2xx (ej. 401, 403, 500), lanzamos un error
          const error = new Error(data.message || `Error HTTP: ${response.status}`);
          error.response = { status: response.status, data: data };
          throw error;
        }

        // 4. ÉXITO
        this.mensajeExito = '✅ ¡Vehículo registrado exitosamente!';
        console.log('Registro Exitoso:', data);
        
        this.vehiculo = { placa: '', capacidad: 0, tipo: '' };

      } catch (error) {
        // 5. ERROR
        console.error('Error de registro:', error.response || error);
        
        let mensaje = '❌ Ocurrió un error. El registro no se completó.';
        
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                mensaje = '❌ ERROR: No Autorizado. ¡Revisa tu Token y la URL de la API!';
            } else if (error.response.data && error.response.data.message) {
                mensaje = '❌ Error de la API: ' + error.response.data.message; 
            }
        } else {
            mensaje = `❌ Error de conexión: ${error.message}`;
        }
        
        this.mensajeError = mensaje;
      }
    },
  },
};

export default RegistroVehiculo; // ⬅️ Exportamos el objeto del componente.
</script>

<style scoped>
/* Estilos para que se vea ordenado */
.registro-vehiculo-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input, select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background-color: #45a049;
}
.mensaje-exito {
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  margin-bottom: 15px;
}

.mensaje-error {
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-bottom: 15px;
}
</style>
