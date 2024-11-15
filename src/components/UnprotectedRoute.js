import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function UnprotectedRoute({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return user ? <Navigate to="/create" /> : children;
}
