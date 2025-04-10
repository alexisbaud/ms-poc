import { createSlice } from '@reduxjs/toolkit';
import { logout as logoutService } from '../../services/auth';

// Fonction pour récupérer les données utilisateur du localStorage au démarrage
const loadUserFromStorage = () => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    console.info(
      '[REDUX AUTH] Chargement état initial',
      'Token présent:', !!token,
      'User présent:', !!user
    );
    
    if (token && !user) {
      console.warn('[REDUX AUTH] État incohérent: token présent mais pas d\'utilisateur');
    }
    
    // Vérifier la validité du token JWT
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          console.error('[REDUX AUTH] Format de token invalide (pas 3 segments JWT)');
        } else {
          try {
            const payload = JSON.parse(atob(parts[1]));
            const expiration = payload.exp ? new Date(payload.exp * 1000) : null;
            
            if (expiration && expiration < new Date()) {
              console.warn('[REDUX AUTH] Token expiré:', expiration.toISOString());
            }
          } catch (e) {
            console.error('[REDUX AUTH] Impossible de décoder la payload JWT:', e.message);
          }
        }
      } catch (e) {
        console.error('[REDUX AUTH] Erreur lors de l\'analyse du token:', e.message);
      }
    }
    
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
    // Action pour démarrer une requête d'authentification
    authRequest: (state) => {
      console.info('[REDUX AUTH] Début requête authentification');
      state.loading = true;
      state.error = null;
    },
    
    // Action en cas de succès de connexion/inscription
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      
      // Débogage
      console.info('[REDUX AUTH] Action loginSuccess reçue');
      console.info('[REDUX AUTH] Token reçu:', token ? 'Présent' : 'Absent', 'Longueur:', token?.length);
      console.info('[REDUX AUTH] User reçu:', user ? `ID: ${user.id || 'non défini'}` : 'Absent');
      
      if (!token) {
        console.error('[REDUX AUTH] ATTENTION: Token manquant dans loginSuccess');
      }
      
      if (!user) {
        console.error('[REDUX AUTH] ATTENTION: User manquant dans loginSuccess');
      }
      
      // Mettre à jour l'état Redux
      state.token = token;
      state.user = user;
      state.isAuthenticated = !!token;
      state.loading = false;
      state.error = null;
      
      // Persister dans localStorage
      try {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Vérification après persistance
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        console.info(
          '[REDUX AUTH] Persistance dans localStorage:',
          'Token sauvegardé:', !!storedToken,
          'User sauvegardé:', !!storedUser
        );
        
        if (!storedToken || !storedUser) {
          console.error('[REDUX AUTH] Erreur de persistance dans localStorage');
        }
      } catch (e) {
        console.error('[REDUX AUTH] Erreur lors de la sauvegarde dans localStorage:', e.message);
      }
    },
    
    // Action en cas d'échec d'authentification
    authFailure: (state, action) => {
      console.error('[REDUX AUTH] Échec authentification:', action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    
    // Action de déconnexion
    logout: (state) => {
      console.info('[REDUX AUTH] Déconnexion utilisateur');
      
      // Nettoyer l'état Redux
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      
      // Nettoyer le localStorage
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.info('[REDUX AUTH] Données de session supprimées du localStorage');
      } catch (e) {
        console.error('[REDUX AUTH] Erreur lors de la suppression des données:', e.message);
      }
      
      // Appeler le service de déconnexion
      try {
        logoutService();
      } catch (e) {
        console.error('[REDUX AUTH] Erreur dans le service de déconnexion:', e.message);
      }
    },
    
    // Mettre à jour les informations utilisateur
    updateUserInfo: (state, action) => {
      console.info('[REDUX AUTH] Mise à jour des informations utilisateur');
      state.user = { ...state.user, ...action.payload };
      
      try {
        localStorage.setItem('user', JSON.stringify(state.user));
        console.info('[REDUX AUTH] Informations utilisateur mises à jour dans localStorage');
      } catch (e) {
        console.error('[REDUX AUTH] Erreur lors de la mise à jour dans localStorage:', e.message);
      }
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