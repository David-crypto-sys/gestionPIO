// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Rutas
router.post('/', auth, productController.crearProducto);
router.get('/', auth, productController.obtenerProductos);
router.put('/:id', auth, productController.actualizarProducto);
router.delete('/:id', auth, productController.eliminarProducto);

module.exports = router;