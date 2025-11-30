<template>
  <div class="registro-vehiculo">
    <h2>Registrar Vehículo</h2>

    <form @submit.prevent="registrarVehiculo">
      <div class="campo">
        <label for="placa">Placa:</label>
        <input id="placa" v-model="form.placa" required />
      </div>

      <div class="campo">
        <label for="capacidad">Capacidad (kg):</label>
        <input
          id="capacidad"
          v-model.number="form.capacidad"
          type="number"
          min="0"
          required
        />
      </div>

      <div class="campo">
        <label for="tipo">Tipo:</label>
        <select id="tipo" v-model="form.tipo" required>
          <option disabled value="">Seleccione un tipo...</option>
          <option value="Camión">Camión</option>
          <option value="Volqueta">Volqueta</option>
        </select>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Registrando..." : "Registrar" }}
      </button>
    </form>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script>
import { crearVehiculo } from "../services/vehiculosService";

export default {
  data() {
    return {
      form: {
        placa: "",
        capacidad: null,
        tipo: "",
      },
      loading: false,
      mensaje: "",
    };
  },
  methods: {
    async registrarVehiculo() {
      this.loading = true;
      this.mensaje = "";

      try {
        const res = await crearVehiculo({ ...this.form });
        console.log("Respuesta crearVehiculo:", res);
        this.mensaje = " Vehículo registrado correctamente.";
        this.form = { placa: "", capacidad: null, tipo: "" };
      } catch (error) {
        console.error("Error al registrar el vehículo:", error);
        this.mensaje =
          " Error al registrar el vehículo. Revisa la consola para más detalles.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.registro-vehiculo {
  max-width: 400px;
  margin: auto;
}
.campo {
  margin-bottom: 10px;
}
.mensaje {
  margin-top: 12px;
  font-weight: bold;
}
</style>
