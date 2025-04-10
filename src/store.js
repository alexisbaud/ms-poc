import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';

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
    console.log('État Redux sauvegardé dans localStorage');
  } catch (err) {
    console.error('Impossible de sauvegarder l\'état:', err);
  }
};

// Fonction pour charger l'état depuis localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // Laisser le reducer initialiser l'état
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Impossible de charger l\'état:', err);
    return undefined;
  }
};

// Récupérer l'état préchargé
const preloadedState = loadState();

// Configurer le store avec l'état préchargé
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState
});

// S'abonner aux changements du store pour sauvegarder l'état
store.subscribe(() => {
  saveState(store.getState());
});

export default store; 