import { createSlice } from '@reduxjs/toolkit';
import { logout as logoutService } from '../../services/auth';

// Fonction pour récupérer les données utilisateur du sessionStorage au démarrage
const loadUserFromStorage = () => {
  try {
    const token = sessionStorage.getItem('token');
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    return {
      token,
      user,
      isAuthenticated: !!token,
      error: null,
      loading: false
    };
  } catch (error) {
    console.error('Erreur lors du chargement des données utilisateur depuis sessionStorage:', error);
    return {
      token: null,
      user: null,
      isAuthenticated: false,
      error: null,
      loading: false
    };
  }
};

// État initial - charge les données depuis sessionStorage
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
      
      // Mettre à jour l'état Redux
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      
      // Persister dans sessionStorage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
    },
    
    // Action en cas d'échec d'authentification (optionnel)
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Action de déconnexion
    logout: (state) => {
      // Réinitialiser l'état Redux
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      
      // Supprimer du sessionStorage
      logoutService(); // Appelle la fonction de déconnexion du service
    },
    
    // Mettre à jour les informations utilisateur (optionnel)
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      sessionStorage.setItem('user', JSON.stringify(state.user));
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