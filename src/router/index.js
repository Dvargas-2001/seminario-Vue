import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/home.vue";
import RegistroVehiculo from "../components/RegistroVehiculo.vue";
import RegistroRuta from "../components/RegistroRuta.vue";
import ApiTest from "../views/ApiTest.vue";
import MapaView from "../views/MapaView.vue";
import ListaVehiculos from "@/views/ListaVehiculos.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/mapa", name: "MapaView", component: MapaView },
  { path: "/registro-vehiculo", name: "RegistroVehiculo", component: RegistroVehiculo },
  { path: "/registro-ruta", name: "RegistroRuta", component: RegistroRuta },
  { path: "/api-test", name: "ApiTest", component: ApiTest },
  { path: "/vehiculos", name: "Vehiculos", component: ListaVehiculos },
  { path: "/rutas", name: "Rutas", component: () => import("../views/ListaRutas.vue") },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
