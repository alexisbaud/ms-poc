import axios from 'axios';

// Configuration de base pour axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(config => {
  // Vérification des clés dans localStorage
  const token = localStorage.getItem('token');
  
  // Protection supplémentaire pour les requêtes qui nécessitent une authentification
  if (['post', 'put', 'delete'].includes(config.method) && 
      !config.url.includes('/auth/login') && 
      !config.url.includes('/auth/register')) {
  }
  
  // Configuration de l'en-tête avec le token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Vérifier le token à nouveau en cas d'erreur 401
    if (error.response?.status === 401) {
      const token = localStorage.getItem('token');
      
      // Stockage d'information de debug pour résoudre le problème ultérieurement
      localStorage.setItem('lastAuthError', JSON.stringify({
        timestamp: new Date().toISOString(),
        tokenPresent: !!token,
        url: error.config?.url,
        errorDetails: error.response?.data
      }));
      
      // Redirection vers login si erreur 401 (non authentifié) et si ce n'est pas un endpoint public
      // Stocker la dernière URL pour rediriger après la connexion
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/auth') {
        localStorage.setItem('redirectAfterLogin', currentPath);
      }
      
      // Ne pas rediriger automatiquement - laisser les composants gérer l'erreur 401
    }
    
    return Promise.reject(error);
  }
);

export default api; 