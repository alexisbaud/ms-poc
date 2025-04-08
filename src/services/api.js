import axios from 'axios';

// Définir l'URL de base pour toutes les requêtes
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les réponses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gérer les erreurs globalement (ex: expiration de token, serveur indisponible)
    if (error.response && error.response.status === 401) {
      // Token expiré ou invalide
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      // Rediriger vers la page de connexion si nécessaire
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 