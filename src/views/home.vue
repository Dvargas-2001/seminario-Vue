<template>
  <div class="inicio">
    <div class="contenido">
      <!-- IZQUIERDA -->
      <div class="texto">
        <h1 class="titulo"> Sistema de Control Vehicular</h1>
        <p class="descripcion">
          Control, seguridad y rendimiento para una movilidad eficiente.
        </p>
        <router-link to="/registro-vehiculo" class="boton">
          Comenzar
        </router-link>
      </div>

      <!-- DERECHA: LOGO -->
      <div class="imagen">
        <div class="circulo"></div>
        <img :src="logo" alt="Logo Principal" class="logo-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/logo2.png'
</script>

<style scoped>
.inicio {
  background: linear-gradient(120deg, #f8fafc 0%, #e6fff7 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  padding: 60px 20px;
}

.contenido {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 70px;
  max-width: 1250px;
  width: 100%;
}

/* TEXTO */
.texto {
  flex: 1;
  z-index: 2;
}

.titulo {
  font-size: 45px;
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 20px;
}

.descripcion {
  font-size: 18px;
  color: #374151;
  max-width: 460px;
  margin-bottom: 30px;
  line-height: 1.5;
}

.boton {
  display: inline-block;
  padding: 14px 36px;
  background-color: #1e3a8a;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.boton:hover {
  background-color: #162a6b;
  transform: scale(1.05);
}

/* IMAGEN */
.imagen {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circulo {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(56, 189, 248, 0.4), rgba(165, 243, 252, 0.1));
  filter: blur(10px);
  z-index: 1;
}

.logo-img {
  position: relative;
  width: 480px; /* 🚗 imagen más grande */
  height: auto;
  border-radius: 25px;
  z-index: 2;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
</style>
