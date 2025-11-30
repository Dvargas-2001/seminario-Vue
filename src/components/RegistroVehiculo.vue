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
import { registrarVehiculo } from "@/services/vehiculosService";

export default {
  data() {
    return {
      form: {
        placa: "",
        marca: "",
        modelo: "",
        activo: true,
        perfil_id: "",
      },
      loading: false,
      mensaje: "",
    };
  },

  methods: {
    async registrar() {
      this.loading = true;
      this.mensaje = "";

      try {
        const respuesta = await registrarVehiculo(this.form);
        console.log("Registrado:", respuesta);

        this.mensaje = "Vehículo registrado correctamente.";

        // limpiar campos
        this.form = {
          placa: "",
          marca: "",
          modelo: "",
          activo: true,
          perfil_id: "",
        };
      } catch (error) {
        console.error(error);
        this.mensaje = "Error al registrar el vehículo.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
