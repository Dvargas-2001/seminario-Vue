<template>
  <div class="registro-vehiculo">
    <h2>Registro de Vehículo</h2>

    <form @submit.prevent="registrarVehiculo">
      <div class="campo">
        <label>Placa:</label>
        <input v-model.trim="vehiculo.placa" required placeholder="Ej: ABC123" />
      </div>

      <div class="campo">
        <label>Modelo:</label>
        <input v-model.trim="vehiculo.modelo" required placeholder="Ej: Toyota Corolla" />
      </div>

      <div class="campo">
        <label>Propietario:</label>
        <input v-model.trim="vehiculo.propietario" required placeholder="Ej: Gilary Vargas" />
      </div>

      <div class="campo">
        <label>Estado:</label>
        <select v-model="vehiculo.estado" required>
          <option value="">Seleccione...</option>
          <option>Activo</option>
          <option>Inactivo</option>
          <option>En mantenimiento</option>
        </select>
      </div>

      <button type="submit" class="btn-guardar">Registrar Vehículo</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegistroVehiculo",
  data() {
    return {
      vehiculo: {
        placa: "",
        modelo: "",
        propietario: "",
        estado: ""
      }
    };
  },
  methods: {
    registrarVehiculo() {
      // Validaciones básicas
      if (!this.vehiculo.placa || !this.vehiculo.modelo || !this.vehiculo.propietario || !this.vehiculo.estado) {
        alert("⚠️ Todos los campos son obligatorios.");
        return;
      }

      // Validar formato de placa (3 letras y 3 números, ejemplo: ABC123)
      const placaValida = /^[A-Z]{3}\d{3}$/i.test(this.vehiculo.placa);
      if (!placaValida) {
        alert("⚠️ La placa debe tener el formato ABC123 (3 letras y 3 números).");
        return;
      }

      // Verificar si ya existe una placa igual en LocalStorage
      const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
      const placaExistente = vehiculos.find(v => v.placa.toUpperCase() === this.vehiculo.placa.toUpperCase());
      if (placaExistente) {
        alert("⚠️ Esta placa ya está registrada.");
        return;
      }

      // Si pasa las validaciones, registrar el vehículo
      const nuevoVehiculo = {
        id: Date.now(),
        ...this.vehiculo
      };

      vehiculos.push(nuevoVehiculo);
      localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

      alert("✅ Vehículo registrado correctamente.");

      // Limpiar formulario
      this.vehiculo = {
        placa: "",
        modelo: "",
        propietario: "",
        estado: ""
      };
    }
  }
};
</script>

<style scoped>
.registro-vehiculo {
  max-width: 500px;
  margin: 40px auto;
  padding: 25px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #007bff;
}

.campo {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
}

.btn-guardar {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.btn-guardar:hover {
  background-color: #0056b3;
}
</style>
