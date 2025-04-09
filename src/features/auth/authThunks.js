import { createAsyncThunk } from '@reduxjs/toolkit';
import { authRequest, loginSuccess, authFailure, logout } from './authSlice';
import * as authService from '../../services/auth';

/**
 * Thunk pour l'inscription d'un utilisateur
 */
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, pseudo }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authRequest());
      const result = await authService.register({ email, password, pseudo });
      dispatch(loginSuccess(result));
      return result;
    } catch (error) {
      dispatch(authFailure(error.message));
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Thunk pour la connexion d'un utilisateur
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authRequest());
      const result = await authService.login({ email, password });
      dispatch(loginSuccess(result));
      return result;
    } catch (error) {
      dispatch(authFailure(error.message));
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Thunk pour la déconnexion d'un utilisateur
 */
export const logoutUser = () => (dispatch) => {
  authService.logout();
  dispatch(logout());
};

// Version alternative utilisant createAsyncThunk
export const registerUserAsync = createAsyncThunk(
  'auth/register',
  async ({ email, password, pseudo }, { rejectWithValue }) => {
    try {
      return await authService.register({ email, password, pseudo });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await authService.login({ email, password });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); 