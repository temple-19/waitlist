import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return user ? children : <Navigate to="/login" />;
}
