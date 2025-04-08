import api from './api';

/**
 * Service pour gérer l'authentification des utilisateurs
 */

/**
 * Inscrit un nouvel utilisateur
 * @param {Object} userData - Données de l'utilisateur
 * @param {string} userData.email - Email de l'utilisateur
 * @param {string} userData.password - Mot de passe de l'utilisateur (min 8 caractères)
 * @param {string} userData.pseudo - Pseudonyme de l'utilisateur
 * @returns {Promise<Object>} - Objet contenant le token et les données utilisateur
 */
export const register = async ({ email, password, pseudo }) => {
  try {
    const response = await api.post('/auth/register', { email, password, pseudo });
    
    // Stocker le token et les infos utilisateur dans le sessionStorage
    const { token, ...user } = response.data;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    
    return { token, user };
  } catch (error) {
    // Gérer les erreurs spécifiques à l'inscription
    if (error.response) {
      // Le serveur a répondu avec un statut d'erreur
      throw new Error(error.response.data.message || 'Erreur lors de l\'inscription');
    }
    throw new Error('Impossible de contacter le serveur');
  }
};

/**
 * Connecte un utilisateur existant
 * @param {Object} credentials - Identifiants de connexion
 * @param {string} credentials.email - Email de l'utilisateur
 * @param {string} credentials.password - Mot de passe de l'utilisateur
 * @returns {Promise<Object>} - Objet contenant le token et les données utilisateur
 */
export const login = async ({ email, password }) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    // Stocker le token et les infos utilisateur dans le sessionStorage
    const { token, ...user } = response.data;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    
    return { token, user };
  } catch (error) {
    // Gérer les erreurs spécifiques à la connexion
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error('Identifiants invalides');
      }
      throw new Error(error.response.data.message || 'Erreur lors de la connexion');
    }
    throw new Error('Impossible de contacter le serveur');
  }
};

/**
 * Déconnecte l'utilisateur actuel
 */
export const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

/**
 * Récupère les informations de l'utilisateur connecté depuis le sessionStorage
 * @returns {Object|null} - Données utilisateur ou null si non connecté
 */
export const getCurrentUser = () => {
  const userStr = sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Vérifie si un utilisateur est connecté
 * @returns {boolean} - true si l'utilisateur est connecté
 */
export const isAuthenticated = () => {
  return !!sessionStorage.getItem('token');
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated
}; 