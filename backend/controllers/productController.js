const Product = require('../models/Product');
const User = require('../models/User');

exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Product(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear producto' });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id);
    let productos;

    if (usuario.role === 'admin') {
      productos = await Product.find();
    } else {
      productos = await Product.find({
        $or: [
          { usuario: req.usuario.id },
          { visiblePara: req.usuario.id }
        ]
      });
    }
    res.json(productos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener productos' });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar producto' });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar producto' });
  }
};

exports.compartirProducto = async (req, res) => {
  try {
    const { productoId, usuarioEmail } = req.body;
    const admin = await User.findById(req.usuario.id);

    if (admin.role !== 'admin') {
      return res.status(403).json({ msg: 'No autorizado' });
    }

    const usuario = await User.findOne({ email: usuarioEmail });
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const producto = await Product.findById(productoId);
    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    if (!producto.visiblePara.includes(usuario._id)) {
      producto.visiblePara.push(usuario._id);
      await producto.save();
    }

    res.json({ msg: 'Producto compartido exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al compartir producto' });
  }
};
