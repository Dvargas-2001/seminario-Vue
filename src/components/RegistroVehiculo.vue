<template>
  <div class="registro-vehiculo">
    <h2>Registrar Vehículo</h2>

    <form @submit.prevent="registrarVehiculo">
      <div class="campo">
        <label for="placa">Placa:</label>
        <input id="placa" v-model="form.placa" required />
      </div>

      <div class="campo">
        <label for="modelo">Modelo:</label>
        <input id="modelo" v-model="form.modelo" required />
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
        modelo: ""
      },
      loading: false,
      mensaje: ""
    };
  },
  methods: {
    async registrarVehiculo() {
      this.loading = true;
      this.mensaje = "";

      try {
        const res = await crearVehiculo({
          placa: this.form.placa,
          modelo: this.form.modelo
        });

        console.log("Respuesta crearVehiculo:", res);

        this.mensaje = "Vehículo registrado correctamente ✔️";
        this.form.placa = "";
        this.form.modelo = "";
      } catch (error) {
        this.mensaje = "Error al registrar el vehículo ❌ (ver consola)";
      } finally {
        this.loading = false;
      }
    }
  }
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
