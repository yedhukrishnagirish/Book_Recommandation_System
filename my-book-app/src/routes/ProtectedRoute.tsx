import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

// Protects routes by checking user authentication; redirects to login if not authenticated
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
