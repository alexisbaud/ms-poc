import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import Login from './Login';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';

const AuthRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  // Si l'utilisateur est déjà connecté, le rediriger vers la page d'accueil
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Si l'utilisateur est déjà connecté, ne pas afficher les pages d'authentification
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<RegisterStep1 />} />
      <Route path="register/step2" element={<RegisterStep2 />} />
      <Route path="*" element={<RegisterStep1 />} /> {/* Par défaut: inscription étape 1 */}
    </Routes>
  );
};

export default AuthRoutes; 