// src/hooks/useAuth.ts

import { useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as AuthService from '../services/AuthService';

export type Credentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const login = async (credentials: Credentials) => {
    try {
      const { user, token } = await AuthService.login(credentials);
      if (user.email && token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify({email: user.email, authentication_token: token}));
        dispatch({ type: 'LOGIN', payload: { token: token, email: user.email } });
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, [dispatch]);

  const initializeAuth = useCallback(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (token && storedUser.email) {
      dispatch({ type: 'LOGIN', payload: { token: token, email: storedUser.email } });
    }
  }, [dispatch]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return {
    isAuthenticated: state.isAuthenticated,
    email: state.email,
    token: state.token,
    login,
    logout
  };
};
