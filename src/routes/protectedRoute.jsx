import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem('accessToken');
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (isLoggedIn && token) ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;