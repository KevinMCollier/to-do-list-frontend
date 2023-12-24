// AuthContext.tsx for to-do app

import React, { createContext, useReducer, useEffect, ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  token: string | null;
}

type AuthAction =
  | { type: 'LOGIN'; payload: { token: string; email: string } }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  token: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null // Placeholder function
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  console.log('authReducer action:', action); // Debugging: Log the action
  console.log('Current state:', state); // Debugging: Log the current state

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        email: action.payload.email
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (token && storedUser && storedUser.email) {
      dispatch({
        type: 'LOGIN',
        payload: {
          token: storedUser.authentication_token,
          email: storedUser.email
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
