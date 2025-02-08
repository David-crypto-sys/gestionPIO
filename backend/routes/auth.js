// routes/auth.js
const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion } = require('../controllers/authController');

// Ruta de registro
// POST /api/auth/registro
router.post('/registro', registrarUsuario);

// Ruta de inicio de sesión
// POST /api/auth/login
router.post('/login', iniciarSesion);

module.exports = router;