import api from './api';

/**
 * Service pour gérer l'authentification des utilisateurs
 */

/**
 * Vérifie si un email est déjà utilisé
 * @param {string} email - Email à vérifier
 * @returns {Promise<boolean>} - True si l'email existe déjà
 */
export const checkEmailExists = async (email) => {
  try {
    const response = await api.post('/auth/check-email', { email });
    return response.data.exists;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Erreur lors de la vérification de l\'email');
    }
    throw new Error('Impossible de contacter le serveur');
  }
};

/**
 * Vérifie si un pseudo est déjà utilisé
 * @param {string} pseudo - Pseudo à vérifier
 * @returns {Promise<boolean>} - True si le pseudo existe déjà
 */
export const checkPseudoExists = async (pseudo) => {
  try {
    const response = await api.post('/auth/check-pseudo', { pseudo });
    return response.data.exists;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Erreur lors de la vérification du pseudo');
    }
    throw new Error('Impossible de contacter le serveur');
  }
};

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
    
    // Extraire et traiter les données de la réponse
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || 'Erreur lors de l\'inscription');
    }
    
    // Stocker le token et les infos utilisateur dans le localStorage
    const { token, user } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { token, user };
  } catch (error) {
    // Gérer les erreurs spécifiques à l'inscription
    if (error.response) {
      // Vérifier si c'est une erreur de validation champ spécifique
      if (error.response.data.field) {
        const field = error.response.data.field;
        const message = error.response.data.message;
        
        if (field === 'email' && message.includes('already exists')) {
          throw new Error('Cet email est déjà associé à un compte');
        } else if (field === 'password') {
          throw new Error('Le mot de passe doit répondre aux critères de sécurité');
        } else if (field === 'pseudo') {
          throw new Error('Le pseudo est invalide ou déjà utilisé');
        }
      }
      
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
    
    // Extraire et traiter les données de la réponse
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || 'Erreur lors de la connexion');
    }
    
    // Stocker le token et les infos utilisateur dans le localStorage
    const { token, user } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { token, user };
  } catch (error) {
    // Gérer les erreurs spécifiques à la connexion
    if (error.response) {
      if (error.response.status === 400 || error.response.status === 401) {
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
  // Supprimer les informations d'authentification du localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Récupère les informations de l'utilisateur connecté depuis le localStorage
 * @returns {Object|null} - Données utilisateur ou null si non connecté
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Vérifie si un utilisateur est connecté
 * @returns {boolean} - true si l'utilisateur est connecté
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated
}; 