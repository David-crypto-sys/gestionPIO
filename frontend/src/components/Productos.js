// src/components/Productos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    cantidad: ''
  });
  const [editingId, setEditingId] = useState(null);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

// Configuración de axios con el token
const axiosConfig = {
  headers: { 'x-auth-token': token }
};

const handleLogout = () => {
  logout();
  navigate('/login');
};
  // Cargar productos
  const cargarProductos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', axiosConfig);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Crear o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, formData, axiosConfig);
      } else {
        await axios.post('http://localhost:5000/api/products', formData, axiosConfig);
      }
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        cantidad: ''
      });
      setEditingId(null);
      cargarProductos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, axiosConfig);
      cargarProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Editar producto
  const handleEdit = (producto) => {
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      cantidad: producto.cantidad
    });
    setEditingId(producto._id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del producto"
            value={formData.nombre}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={formData.categoria}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? 'Actualizar' : 'Crear'} Producto
        </button>
      </form>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div key={producto._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{producto.nombre}</h3>
            <p className="text-gray-600">{producto.descripcion}</p>
            <p className="text-green-600">Precio: ${producto.precio}</p>
            <p>Categoría: {producto.categoria}</p>
            <p>Cantidad: {producto.cantidad}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleEdit(producto)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(producto._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;