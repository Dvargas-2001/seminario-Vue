# Vue 3 + Vite  

## Integrantes  
![Integrantes](https://i.pinimg.com/736x/63/f0/47/63f0477aec61cef7de40f454452b742e.jpg)  

- Gilary Daniela Vargas Hurtado  
- Luz Keyeli Mina Valencia  
- Cristian Obispo  
- Hernando Tovar Alzate  
🧭 Descripción General

Sistema de Control Vehicular es una aplicación web desarrollada con Vue 3 y Vite, orientada a la gestión y monitoreo de flotas de transporte.

El sistema permite registrar vehículos, asignar rutas y realizar pruebas de conexión con una API externa.
Su diseño moderno, limpio y adaptable busca brindar una interfaz intuitiva y profesional para usuarios del sector logístico.

⚙️ Funcionalidades Principales
🚘 Registro de Vehículos

Permite ingresar la placa, capacidad y tipo de vehículo.

Envía los datos al servidor o los guarda localmente si no hay conexión.

Muestra mensajes dinámicos de éxito o error.

Incluye íconos personalizados e interfaz moderna.

🗺️ Registro de Rutas

Muestra una interfaz dividida:

Izquierda: mapa ilustrativo (imagen ruta.jpeg).

Derecha: formulario de registro de rutas.

Ideal para simular la asignación de zonas de cobertura o trayectos.

🌐 Conexión a la API

Permite probar la conexión con la API real (http://apirecoleccion.gonzaloandreslucio.com/api).

Incluye botón de “Listar Vehículos” para mostrar los registros obtenidos desde la API.

Muestra mensajes de estado: conexión exitosa o fallida.

Incluye una imagen representativa (api.jpeg).

🖼️ Vista Principal

La página de inicio presenta el logo de la empresa y el lema:

“Control, seguridad y rendimiento para una movilidad eficiente.”

Diseño centrado, profesional y minimalista.

🧩 Tecnologías Utilizadas

Vue 3

Vite

Axios

TailwindCSS (estilo base)

JavaScript moderno (Composition API)

🗂️ Estructura del Proyecto
src/
 ├─ assets/             # Imágenes e íconos (logo.jpg, ruta.jpeg, api.jpeg, etc.)
 ├─ components/         # Componentes principales (NavBar, RegistroVehiculo, RegistroRuta)
 ├─ views/              # Vistas principales (Home, ApiTest)
 ├─ router/             # Configuración de rutas (index.js)
 └─ App.vue             # Componente raíz
