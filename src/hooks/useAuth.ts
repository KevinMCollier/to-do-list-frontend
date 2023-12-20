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

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: 'LOGIN', payload: user });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = useCallback(() => {
    AuthService.logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, [dispatch]);

  const initializeAuth = useCallback(() => {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (token && user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, [dispatch]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    email: state.user?.email,
    token: state.token,
    login,
    logout,
  };
};
