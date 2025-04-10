import axios from 'axios';

// URL et configuration de l'API
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
console.info('[API CONFIG] URL API configurée:', apiUrl);

// Configuration de base pour axios
const api = axios.create({
  baseURL: apiUrl,
  timeout: 20000, // Augmenté à 20 secondes pour les serveurs Render en veille
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

console.info('[API CONFIG] Timeout configuré:', api.defaults.timeout, 'ms');

// Variable pour suivre les tentatives de réveil de Render
let renderWakeupAttempted = false;

// Fonction pour "réveiller" le serveur Render
const wakeupRender = async () => {
  if (renderWakeupAttempted) return; // Ne tente le réveil qu'une fois
  renderWakeupAttempted = true;
  
  try {
    console.info('[API WAKEUP] Tentative de réveil du serveur Render...');
    const startTime = performance.now();
    const serverBaseUrl = apiUrl.replace(/\/api$/, '');
    
    // Requête simple pour réveiller le serveur
    const response = await fetch(`${serverBaseUrl}?wakeup=true&t=${Date.now()}`, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' }
    });
    
    const wakeupTime = performance.now() - startTime;
    console.info(
      '[API WAKEUP] Réveil tenté:',
      'Status:', response.status,
      'Temps:', wakeupTime.toFixed(0), 'ms',
      'Indication veille:', wakeupTime > 2000 ? 'Serveur probablement en veille' : 'Serveur déjà actif'
    );
    
    return { success: response.ok, time: wakeupTime };
  } catch (error) {
    console.error('[API WAKEUP] Échec du réveil:', error.message);
    return { success: false, error: error.message };
  }
};

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(async config => {
  // Vérification des clés dans localStorage
  const token = localStorage.getItem('token');
  
  console.info(
    `[API REQUEST] ${config.method.toUpperCase()} ${config.url}`,
    'Token présent:', !!token,
    'Timeout:', config.timeout
  );
  
  // Si c'est une requête importante (non GET) et que c'est la première,
  // tenter de réveiller Render préventivement
  if (config.method !== 'get' && !renderWakeupAttempted) {
    try {
      await wakeupRender();
      // Attendre un court instant pour laisser le serveur se stabiliser
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (e) {
      console.warn('[API REQUEST] Erreur lors du réveil préventif:', e.message);
    }
  }
  
  // Configuration de l'en-tête avec le token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.info('[API AUTH] Token ajouté à la requête');
  }
  
  return config;
}, error => {
  console.error('[API REQUEST ERROR] Erreur avant envoi de la requête:', error.message);
  return Promise.reject(error);
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
  async error => {
    // Log détaillé de l'erreur
    const errorConfig = error.config || {};
    const errorResponse = error.response || {};
    
    const errorDetails = {
      url: errorConfig.url || 'unknown',
      method: errorConfig.method?.toUpperCase() || 'unknown',
      status: errorResponse.status || 'no response',
      statusText: errorResponse.statusText || 'unknown',
      message: error.message || 'no message',
      code: error.code || 'no code'
    };
    
    // Si c'est une erreur de timeout, essayer de réveiller Render
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.warn('[API TIMEOUT] Délai dépassé pour la requête. Probable serveur Render en veille.');
      
      // Afficher des suggestions
      console.info('[API TIMEOUT] Suggestions:');
      console.info('1. Visitez directement https://server-poc.onrender.com pour réveiller le serveur');
      console.info('2. Attendez 30 secondes et réessayez');
      console.info('3. Vérifiez le statut de Render sur leur dashboard');
      
      // Tenter de réveiller le serveur
      try {
        const wakeupResult = await wakeupRender();
        if (wakeupResult.success) {
          console.info('[API RECOVERY] Serveur réveillé, vous pouvez réessayer dans quelques secondes');
        }
      } catch (wakeupError) {
        console.error('[API RECOVERY] Échec de la tentative de réveil:', wakeupError.message);
      }
      
      // Ajouter des informations sur le timeout aux détails d'erreur
      errorDetails.timeoutValue = errorConfig.timeout || api.defaults.timeout;
      errorDetails.renderWakeupAttempted = renderWakeupAttempted;
    }
    
    console.error('[API ERROR]', JSON.stringify(errorDetails));
    
    // Test réseau en cas d'erreur de connexion
    if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
      console.warn('[NETWORK DIAGNOSTIC] Test de connectivité générale...');
      
      try {
        const testResponse = await fetch('https://www.google.com', { mode: 'no-cors', cache: 'no-store' });
        console.info('[NETWORK DIAGNOSTIC] Connexion internet fonctionnelle (Google accessible)');
        console.warn('[NETWORK DIAGNOSTIC] Problème spécifique avec le serveur API');
      } catch (netError) {
        console.error('[NETWORK DIAGNOSTIC] Problème de connexion internet général:', netError.message);
      }
    }
    
    // Vérifier le token à nouveau en cas d'erreur 401
    if (errorResponse.status === 401) {
      const token = localStorage.getItem('token');
      
      // Stockage d'information de debug pour résoudre le problème ultérieurement
      localStorage.setItem('lastAuthError', JSON.stringify({
        timestamp: new Date().toISOString(),
        tokenPresent: !!token,
        url: errorConfig.url,
        errorDetails: errorResponse.data
      }));
      
      // Redirection vers login si erreur 401 (non authentifié) et si ce n'est pas un endpoint public
      // Stocker la dernière URL pour rediriger après la connexion
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/auth') {
        localStorage.setItem('redirectAfterLogin', currentPath);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api; 