# Sistema de Gestión de Productos

Este proyecto es una aplicación web CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de productos, desarrollada con el stack MERN (MongoDB, Express, React, Node.js).

## Características

- Autenticación de usuarios (registro e inicio de sesión)
- Gestión completa de productos:
  - Crear nuevos productos
  - Ver lista de productos
  - Actualizar productos existentes
  - Eliminar productos
- Interfaz responsiva con Tailwind CSS
- Protección de rutas con JWT

## Tecnologías Utilizadas

### Backend
- Node.js con Express
- MongoDB para base de datos
- JWT para autenticación
- bcryptjs para encriptación de contraseñas

### Frontend
- React
- Tailwind CSS para estilos
- Axios para peticiones HTTP
- React Router para navegación

## Instalación y Ejecución

### Requisitos Previos
- Node.js
- MongoDB
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/David-crypto-sys/gestionPIO.git
cd gestionPIO
```

2. **Configurar el Backend**
```bash
cd backend
npm install
```
Crear archivo `.env` con:
```
MONGODB_URI=mongodb://localhost:27017/gestion_productos
JWT_SECRET=tu_clave_secreta
PORT=5000
```

3. **Configurar el Frontend**
```bash
cd ../frontend
npm install
```

4. **Ejecutar la aplicación**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Autor
[Tu Nombre]
