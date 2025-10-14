import { createRouter, createWebHistory } from 'vue-router'

// Importar todas las vistas necesarias
import Home from '../views/home.vue'
import RegistroVehiculo from '../components/RegistroVehiculo.vue'
import RegistroRuta from '../components/RegistroRuta.vue'
import ApiTest from '../views/ApiTest.vue'
import MapaView from '../views/MapaView.vue'
import ListaVehiculos from '../views/ListaVehiculos.vue'

// Definición de rutas
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/mapa', name: 'MapaView', component: MapaView },
  { path: '/registro-vehiculo', name: 'RegistroVehiculo', component: RegistroVehiculo },
  { path: '/registro-ruta', name: 'RegistroRuta', component: RegistroRuta },
  { path: '/api-test', name: 'ApiTest', component: ApiTest },
  { path: '/lista-vehiculos', name: 'ListaVehiculos', component: ListaVehiculos }
]

// Creación del router
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
