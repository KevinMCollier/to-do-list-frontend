const API_URL = 'http://localhost:3000';

type Credentials = {
  email: string;
  password: string;
};

export const login = async (credentials: Credentials) => {
  try {
    const response = await fetch(`${API_URL}/users/sign_in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: credentials }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Login failed');
    }

    if (!data.user || !data.user.authentication_token) {
      throw new Error('Invalid login credentials');
    }

    const authToken = data.user.authentication_token;
    const userEmail = data.user.email;

    return { user: { email: userEmail }, token: authToken };
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logout = async () => {
  // Implement logout functionality
};
