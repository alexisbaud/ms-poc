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
  
  // Journalisation détaillée des requêtes
  console.log(`🔍 API Request: ${config.method.toUpperCase()} ${config.url}`);
  console.log(`🔍 API BaseURL: ${config.baseURL}`);
  console.log(`🔍 API Full URL: ${config.baseURL}${config.url}`);
  
  // Protection supplémentaire pour les requêtes qui nécessitent une authentification
  if (['post', 'put', 'delete'].includes(config.method) && 
      !config.url.includes('/auth/login') && 
      !config.url.includes('/auth/register')) {
  }
  
  // Configuration de l'en-tête avec le token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔍 API Token présent dans les headers');
  } else {
    console.log('🔍 API Aucun token trouvé dans localStorage');
  }
  
  return config;
}, error => {
  console.error('🔍 API Erreur de requête:', error);
  return Promise.reject(error);
});

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  response => {
    console.log(`🔍 API Réponse: ${response.status} ${response.statusText} pour ${response.config.url}`);
    return response;
  },
  error => {
    // Journal détaillé pour toutes les erreurs
    console.error('🔍 API Erreur détectée:', error.message);
    
    // Détails de l'erreur par type
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      console.error(`🔍 API Erreur serveur: ${error.response.status} ${error.response.statusText}`);
      console.error('🔍 API Données d\'erreur:', error.response.data);
      console.error('🔍 API Headers de réponse:', error.response.headers);
      
      // Stockage des erreurs dans localStorage pour débogage
      localStorage.setItem('lastApiError', JSON.stringify({
        timestamp: new Date().toISOString(),
        url: error.config?.url,
        method: error.config?.method,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        baseURL: error.config?.baseURL
      }));
      
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
        
        // Essayer de décoder le JWT pour vérifier s'il est valide/expiré
        if (token) {
          try {
            // Vérifier si le token a une structure valide (3 parties séparées par des points)
            const parts = token.split('.');
            if (parts.length === 3) {
              const payload = JSON.parse(atob(parts[1]));
              console.error('🔍 API Contenu du JWT:', payload);
              
              // Vérifier l'expiration
              if (payload.exp) {
                const expDate = new Date(payload.exp * 1000);
                const now = new Date();
                console.error(`🔍 API JWT expiré: ${expDate < now}, Expiration: ${expDate.toISOString()}`);
              }
            } else {
              console.error('🔍 API Token JWT mal formaté');
            }
          } catch (e) {
            console.error('🔍 API Erreur lors du décodage du JWT:', e.message);
          }
        }
        
        // Redirection vers login si erreur 401 (non authentifié) et si ce n'est pas un endpoint public
        // Stocker la dernière URL pour rediriger après la connexion
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/auth') {
          localStorage.setItem('redirectAfterLogin', currentPath);
        }
        
        // Ne pas rediriger automatiquement - laisser les composants gérer l'erreur 401
      }
    } else if (error.request) {
      // La requête a été envoyée mais aucune réponse n'a été reçue
      console.error('🔍 API Aucune réponse reçue:', error.request);
      
      // Vérifier si c'est potentiellement une erreur CORS
      if (error.message && (
        error.message.includes('Network Error') || 
        error.message.includes('CORS') ||
        error.message.includes('cross-origin')
      )) {
        console.error('🔍 API Erreur CORS possible - Vérifier la configuration du serveur');
        console.error(`🔍 API URL appelée: ${error.config.baseURL}${error.config.url}`);
        console.error(`🔍 API Origine: ${window.location.origin}`);
        
        localStorage.setItem('lastCorsError', JSON.stringify({
          timestamp: new Date().toISOString(),
          url: error.config?.url,
          fullUrl: `${error.config?.baseURL}${error.config?.url}`,
          origin: window.location.origin,
          message: error.message
        }));
      }
      
      // Stockage pour débogage
      localStorage.setItem('lastNetworkError', JSON.stringify({
        timestamp: new Date().toISOString(),
        url: error.config?.url,
        method: error.config?.method,
        message: error.message,
        baseURL: error.config?.baseURL
      }));
    } else {
      // Erreurs lors de la configuration de la requête
      console.error('🔍 API Erreur de configuration:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api; 