import { createAsyncThunk } from '@reduxjs/toolkit';
import { authRequest, loginSuccess, authFailure, logout } from './authSlice';
import * as authService from '../../services/auth';

/**
 * Thunk pour l'inscription d'un utilisateur
 */
export const registerUser = ({ email, password, pseudo }) => async (dispatch) => {
  try {
    dispatch(authRequest());
    const result = await authService.register({ email, password, pseudo });
    dispatch(loginSuccess(result));
    return result;
  } catch (error) {
    dispatch(authFailure(error.message));
    throw error;
  }
};

/**
 * Thunk pour la connexion d'un utilisateur
 */
export const loginUser = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(authRequest());
    const result = await authService.login({ email, password });
    dispatch(loginSuccess(result));
    return result;
  } catch (error) {
    dispatch(authFailure(error.message));
    throw error;
  }
};

/**
 * Thunk pour la déconnexion d'un utilisateur
 */
export const logoutUser = () => (dispatch) => {
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