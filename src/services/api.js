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

console.info('[API CONFIG] URL de base API configurée:', api.defaults.baseURL);

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(config => {
  // Vérification des clés dans localStorage
  const token = localStorage.getItem('token');
  
  console.info(
    `[API REQUEST] ${config.method.toUpperCase()} ${config.url}`,
    'Token présent:', !!token,
    'Headers:', JSON.stringify(config.headers)
  );
  
  // Protection supplémentaire pour les requêtes qui nécessitent une authentification
  if (['post', 'put', 'delete'].includes(config.method) && 
      !config.url.includes('/auth/login') && 
      !config.url.includes('/auth/register')) {
  }
  
  // Configuration de l'en-tête avec le token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.info('[API AUTH] Token ajouté à la requête');
  }
  
  return config;
});

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  response => {
    console.info(
      `[API RESPONSE] ${response.config.method.toUpperCase()} ${response.config.url}`,
      'Status:', response.status,
      'Data sample:', JSON.stringify(response.data).substring(0, 100) + '...'
    );
    return response;
  },
  error => {
    // Log détaillé de l'erreur
    const errorDetails = {
      url: error.config?.url || 'unknown',
      method: error.config?.method?.toUpperCase() || 'unknown',
      status: error.response?.status || 'no response',
      statusText: error.response?.statusText || 'unknown',
      message: error.message || 'no message',
      data: error.response?.data || 'no data'
    };
    
    console.error('[API ERROR]', JSON.stringify(errorDetails));
    
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