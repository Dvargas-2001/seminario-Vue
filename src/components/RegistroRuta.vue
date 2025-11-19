<template>
  <div class="registro-ruta">
    <h2>Registrar Ruta</h2>

    <form @submit.prevent="registrarRuta">
      
      <!-- PERFIL -->
      <div class="campo">
        <label for="perfil">Perfil:</label>
        <select id="perfil" v-model="form.id_perfil" required>
          <option disabled value="">Seleccione un perfil...</option>
          <option v-for="p in perfiles" :key="p.id" :value="p.id">
            {{ p.nombre }}
          </option>
        </select>
      </div>

      <!-- VEHÍCULO -->
      <div class="campo">
        <label for="vehiculo">Vehículo:</label>
        <select id="vehiculo" v-model="form.id_vehiculo" required>
          <option disabled value="">Seleccione un vehículo...</option>
          <option v-for="v in vehiculos" :key="v.id" :value="v.id">
            {{ v.placa }} – {{ v.modelo }}
          </option>
        </select>
      </div>

      <div class="campo">
        <label for="calle_inicio">Calle Inicio:</label>
        <input id="calle_inicio" v-model="form.calle_inicio" required />
      </div>

      <div class="campo">
        <label for="calle_fin">Calle Fin:</label>
        <input id="calle_fin" v-model="form.calle_fin" required />
      </div>

      <div class="campo">
        <label for="lat_inicio">Latitud Inicio:</label>
        <input id="lat_inicio" v-model="form.lat_inicio" required />
      </div>

      <div class="campo">
        <label for="lon_inicio">Longitud Inicio:</label>
        <input id="lon_inicio" v-model="form.lon_inicio" required />
      </div>

      <div class="campo">
        <label for="lat_fin">Latitud Fin:</label>
        <input id="lat_fin" v-model="form.lat_fin" required />
      </div>

      <div class="campo">
        <label for="lon_fin">Longitud Fin:</label>
        <input id="lon_fin" v-model="form.lon_fin" required />
      </div>

      <!-- ESTADO -->
      <div class="campo">
        <label for="estado">Estado:</label>
        <select id="estado" v-model="form.estado" required>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Registrando..." : "Registrar Ruta" }}
      </button>
    </form>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

    <!-- LISTA DE RUTAS -->
    <div class="lista-rutas">
      <h3>Rutas Registradas</h3>
      <ul>
        <li v-for="ruta in rutas" :key="ruta.id">
          <strong>{{ ruta.calle_inicio }} → {{ ruta.calle_fin }}</strong>
          (Vehículo: {{ ruta.id_vehiculo }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRutas, crearRuta } from "../services/rutasService";
import { getPerfiles } from "../services/perfiles";
import { getVehiculos } from "../services/vehiculosService";

export default {
  data() {
    return {
      perfiles: [],
      vehiculos: [],
      form: {
        id_perfil: "",
        id_vehiculo: "",
        calle_inicio: "",
        calle_fin: "",
        lat_inicio: "",
        lon_inicio: "",
        lat_fin: "",
        lon_fin: "",
        estado: "activo"
      },
      rutas: [],
      loading: false,
      mensaje: ""
    };
  },

  async mounted() {
    await this.cargarPerfiles();
    await this.cargarVehiculos();
    await this.cargarRutas();
  },

  methods: {
    async cargarPerfiles() {
      this.perfiles = await getPerfiles();
    },

    async cargarVehiculos() {
      this.vehiculos = await getVehiculos();
    },

    async cargarRutas() {
      this.rutas = await getRutas();
    },

    async registrarRuta() {
      this.loading = true;
      this.mensaje = "";

      try {
        await crearRuta(this.form);
        this.mensaje = "Ruta registrada correctamente ✔️";
        await this.cargarRutas();
      } catch (error) {
        this.mensaje = "Error al registrar la ruta ❌ (ver consola)";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.registro-ruta {
  max-width: 600px;
  margin: auto;
}
.campo {
  margin-bottom: 12px;
}
.mensaje {
  margin-top: 10px;
  font-weight: bold;
}
.lista-rutas {
  margin-top: 20px;
}
</style>
