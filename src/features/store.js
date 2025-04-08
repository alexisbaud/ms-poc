import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

// Configurer le store avec les reducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Ajouter d'autres reducers ici au besoin
  },
  // Middleware par défaut inclut Redux Thunk pour les actions asynchrones
});

export default store; 