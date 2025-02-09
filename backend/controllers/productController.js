// controllers/productController.js
const Product = require('../models/Product');

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { nombre, descripcion, precio, categoria, cantidad } = req.body;

    // Crear nuevo producto
    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio,
      categoria,
      cantidad,
      usuario: req.usuario.id  // ID del usuario que lo crea
    });

    // Guardar producto en la base de datos
    const producto = await nuevoProducto.save();

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el producto' });
  }
};

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    // Buscar productos del usuario autenticado
    const productos = await Product.find({ usuario: req.usuario.id });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los productos' });
  }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, cantidad } = req.body;

    // Verificar si el producto existe
    let producto = await Product.findById(req.params.id);
    
    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    // Verificar que el usuario sea el dueño del producto
    if (producto.usuario.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // Actualizar producto
    producto = await Product.findByIdAndUpdate(
      req.params.id, 
      { nombre, descripcion, precio, categoria, cantidad },
      { new: true }  // Devuelve el producto actualizado
    );

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    // Verificar si el producto existe
    let producto = await Product.findById(req.params.id);
    
    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    // Verificar que el usuario sea el dueño del producto
    if (producto.usuario.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // Eliminar producto
    await Product.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el producto' });
  }
};