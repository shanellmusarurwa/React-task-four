// src/components/PublicRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css'; // Make sure this import path is correct

const PublicRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return currentUser ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;