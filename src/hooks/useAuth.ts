import { useContext, useCallback, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as AuthService from '../services/AuthService';

export type Credentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);  // Loading state added

  const login = async (credentials: Credentials) => {
    try {
      const { user, token } = await AuthService.login(credentials);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      console.log("Saving user to localStorage:", user);
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
    console.log("Initializing auth with token:", token, "and user:", user);

    if (token && user && user._id) {  // Check for user._id
      dispatch({ type: 'LOGIN', payload: user });
    }
    setLoading(false);
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
    loading,  // Include loading in the return value
  };
};
