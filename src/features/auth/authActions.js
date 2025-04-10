import { createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginService, register as registerService } from '../../services/auth';
import { loginSuccess } from './authSlice';

// Action asynchrone pour la connexion utilisateur
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      // Appel au service d'authentification
      const { token, user } = await loginService(credentials);
      
      // Stocker le token dans localStorage (pour accès global)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Dispatch l'action loginSuccess pour mettre à jour le state Redux
      dispatch(loginSuccess({ token, user }));
      
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de la connexion');
    }
  }
);

// ... existing code ... 