// Importamos el módulo mongoose
const mongoose = require('mongoose');

// Definimos el esquema de usuario
const UserSchema = new mongoose.Schema({
  // Campo de correo electrónico
  email: {
    type: String,
    required: true,     // Es obligatorio
    unique: true,       // No puede haber dos usuarios con el mismo correo
    trim: true,         // Elimina espacios en blanco
    lowercase: true     // Convierte a minúsculas
  },
  password: {
    type: String,
    required: true,
    minlength: 6        // Longitud mínima de contraseña
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  // Fecha de creación del usuario (se genera automáticamente)
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Exportamos el modelo para poder usarlo en otras partes de la aplicación
module.exports = mongoose.model('User', UserSchema);