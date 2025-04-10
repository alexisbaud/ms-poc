import { useState, useEffect, useContext, createContext } from 'react';
import api from '../services/api';

// Créer un contexte d'authentification
const AuthContext = createContext(null);

// Fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Configurer le token dans les en-têtes pour toutes les requêtes
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Récupérer les informations de l'utilisateur connecté
          const response = await api.get('/users/me');
          
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          // Nettoyer si le token est invalide
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      const { token, user: userData } = response.data;
      
      // Stocker le token et configurer les en-têtes
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Une erreur est survenue' 
      };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    // Nettoyer le stockage et les en-têtes
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    
    setUser(null);
    setIsAuthenticated(false);
  };

  // Exposer les valeurs et fonctions du contexte
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  
  return context;
}; 