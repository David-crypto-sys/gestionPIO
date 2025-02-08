// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  // Nombre del producto
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  // Descripción del producto
  descripcion: {
    type: String,
    required: true
  },
  // Precio del producto
  precio: {
    type: Number,
    required: true,
    min: 0  // El precio no puede ser negativo
  },
  // Categoría del producto
  categoria: {
    type: String,
    required: true
  },
  // Cantidad en inventario
  cantidad: {
    type: Number,
    required: true,
    min: 0  // La cantidad no puede ser negativa
  },
  // Usuario que creó el producto (referencia al modelo de Usuario)
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visiblePara: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // Fecha de creación del producto
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);