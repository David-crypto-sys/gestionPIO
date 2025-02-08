// server.js (versión final)
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

// Inicializamos la aplicación Express
const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());  // Permite solicitudes de diferentes orígenes
app.use(express.json());  // Parsea JSON en las solicitudes

// Importar rutas
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

// Definir rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});