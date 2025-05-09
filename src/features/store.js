import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

// Fonction pour sauvegarder l'état dans localStorage
const saveState = (state) => {
  try {
    // Ne sauvegarder que les propriétés importantes pour éviter des problèmes de taille
    const serializedState = JSON.stringify({
      auth: {
        token: state.auth.token,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
      }
    });
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Gestion silencieuse des erreurs
  }
};

// Fonction pour charger l'état depuis localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // Laisser le reducer initialiser l'état
    }
    const state = JSON.parse(serializedState);
    return state;
  } catch (err) {
    // Gestion silencieuse des erreurs
    return undefined;
  }
};

// Récupérer l'état préchargé
const preloadedState = loadState();

// Configurer le store avec les reducers et l'état préchargé
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Ajouter d'autres reducers ici au besoin
  },
  preloadedState,
  // Middleware par défaut inclut Redux Thunk pour les actions asynchrones
});

// S'abonner aux changements du store pour sauvegarder l'état
let currentAuthState = store.getState().auth;
store.subscribe(() => {
  const previousAuthState = currentAuthState;
  currentAuthState = store.getState().auth;
  
  // Ne sauvegarder que si l'état d'authentification a changé
  if (
    previousAuthState.isAuthenticated !== currentAuthState.isAuthenticated ||
    previousAuthState.token !== currentAuthState.token ||
    JSON.stringify(previousAuthState.user) !== JSON.stringify(currentAuthState.user)
  ) {
    saveState(store.getState());
  }
});

export default store; 