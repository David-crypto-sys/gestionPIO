// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Productos from './components/Productos';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route 
            path="/productos" 
            element={
              <PrivateRoute>
                <Productos />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/productos" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;