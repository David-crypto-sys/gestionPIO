// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Obtener el token del encabezado
  const token = req.header('x-auth-token');

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar el usuario decodificado al request
    req.usuario = decoded.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};