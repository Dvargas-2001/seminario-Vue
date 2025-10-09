import { createRouter, createWebHistory } from 'vue-router'

// Importar vistas y componentes principales
import Home from '../views/home.vue'
import RegistroVehiculo from '../components/RegistroVehiculo.vue'
import RegistroRuta from '../components/RegistroRuta.vue'
import ApiTest from '../views/ApiTest.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/registro-vehiculo', name: 'RegistroVehiculo', component: RegistroVehiculo },
  { path: '/registro-ruta', name: 'RegistroRuta', component: RegistroRuta },
  { path: '/api-test', name: 'ApiTest', component: ApiTest }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
