<template>
  <nav class="navbar">
    <span class="titulo">Sistema de Control Vehicular</span>

    <ul class="menu">
      <li><router-link to="/">Inicio</router-link></li>
      <li><router-link to="/registro-vehiculo">Vehículos</router-link></li>
      <li><router-link to="/registro-ruta">Rutas</router-link></li>
      <li><router-link to="/api-test">Conexión API</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background: rgba(30, 58, 138, 0.75); /* azul translúcido */
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.titulo {
  color: white;
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.menu {
  display: flex;
  list-style: none;
  gap: 35px;
  margin: 0;
  padding: 0;
}

.menu a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s;
}

.menu a:hover {
  color: #a5f3fc; /* azul celeste */
}
</style>
