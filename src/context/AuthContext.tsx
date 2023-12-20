import React, { createContext, useReducer, useEffect, Dispatch } from 'react';

interface User {
  email: string;
  authentication_token: string;
  _id: string;
  // Add other user properties as needed
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload.authentication_token,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (token && user && user.email && user.authentication_token) {
      dispatch({
        type: 'LOGIN',
        payload: user,
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
