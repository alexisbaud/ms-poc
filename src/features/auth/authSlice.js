import { createSlice } from '@reduxjs/toolkit';
import { logout as logoutService } from '../../services/auth';

// Fonction pour récupérer les données utilisateur du localStorage au démarrage
const loadUserFromStorage = () => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    return {
      token,
      user,
      isAuthenticated: !!token,
      error: null,
      loading: false
    };
  } catch (error) {
    console.error('Erreur lors du chargement des données utilisateur depuis localStorage:', error);
    return {
      token: null,
      user: null,
      isAuthenticated: false,
      error: null,
      loading: false
    };
  }
};

// État initial - charge les données depuis localStorage
const initialState = loadUserFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action pour démarrer une requête d'authentification (optionnel)
    authRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Action en cas de succès de connexion/inscription
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      
      // Débogage
      console.log('loginSuccess action reçue - token:', token ? `${token.substring(0, 15)}...` : 'null');
      
      // Mettre à jour l'état Redux
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      
      // Persister dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Vérification après persistance
      console.log('Token sauvegardé dans localStorage:', !!localStorage.getItem('token'));
    },
    
    // Action en cas d'échec d'authentification (optionnel)
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Action de déconnexion
    logout: (state) => {
      // Nettoyer l'état Redux
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      
      // Nettoyer le localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Appeler le service de déconnexion
      logoutService();
    },
    
    // Mettre à jour les informations utilisateur (optionnel)
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  }
});

// Exporter les actions
export const { 
  authRequest, 
  loginSuccess, 
  authFailure, 
  logout,
  updateUserInfo
} = authSlice.actions;

// Sélecteurs
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Exporter le reducer
export default authSlice.reducer; 